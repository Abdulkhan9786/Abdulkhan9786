#Overview
Purpose:To automatically process a column of doctor schedule data from a Google Sheet, match doctors and hospitals to records in the Webflow CMS, and post schedule items.
Workflow:
The user flags a column for processing by changing its header to "Process this column".
The script processes each row in that column:
It extracts the doctor's name and corresponding hospital.
It determines whether the schedule represents a day shift or a night shift.
It constructs a schedule name and slug.
It cross-references the doctor and hospital names against the existing records fetched from Webflow.
The schedule data is then submitted to Webflow.
The header of the processed column is updated to "Already processed" with a timestamp as a note.
Any errors (e.g., missing doctor or hospital) are logged in an "Errors" sheet.

#Code Structure & Functions
#1. onOpen()
Purpose:Adds a custom menu ("Remedo Menu") to the Google Sheet UI when the spreadsheet is opened.
Key Actions:
Retrieves the UI object using SpreadsheetApp.getUi().
Creates a new menu with an item labeled "Add Data" that calls the processScheduleData function.

#2. processScheduleData()
Purpose:Main function to process the schedule data in the active sheet.
Workflow:
Initialization:
Logs the start of the process.
Retrieves the active sheet named (e.g., "Dec-24").
Loads the entire data range into a two-dimensional array.
Extracts the header row.
Data Fetching:
Calls helper functions getExistingHospitals() and getExistingDoctors() to fetch current hospital and doctor records from Webflow.
Retrieves or creates an "Errors" sheet using getErrorSheet().
Processing Loop:
Iterates through each column (starting from column 2) in the header.
Checks if the column header is "Process this column".
For flagged columns, extracts the schedule date from the second row and formats it.
Iterates through rows starting from row 4:
Extracts the doctor’s name and hospital name.
Determines if it is a night shift by testing for "Night Shift" in the hospital name.
Constructs a schedule name and a URL-friendly slug.
Validates the doctor’s existence by searching the fetched doctors list.
If not found, logs an error in the "Errors" sheet.
Determines the hospital(s) for assignment:
For night shifts, calls getPODHospitals() to fetch a list of hospitals associated with a POD.
For day shifts, uses the hospital name directly.
For each assigned hospital, validates its existence and calls addScheduleToWebflow() to post the schedule.
Finalization:
Updates the header cell for the processed column to "Already processed" and adds a timestamp as a note.

#3. getErrorSheet()
Purpose:Retrieves or creates an "Errors" sheet to log processing errors.
Key Actions:
Checks for an existing sheet named "Errors"; if not found, creates a new one.
Clears any existing content and adds a header row: ["Row", "Error Message"].
Returns the sheet object for use in logging errors.

#4. getExistingHospitals()
Purpose:Fetches hospital records from the Webflow CMS.
Key Actions:
Constructs an API URL using predefined constants (BASE_URL, HOSPITALS_COLLECTION_ID).
Sets up a GET request with the necessary authorization header.
Parses the JSON response and logs the number of hospitals retrieved.
Maps the response to an array of hospital objects containing id, name, and location.
Handles errors by logging them and returning an empty array.

#5. getExistingDoctors()
Purpose:Fetches doctor records from the Webflow CMS.
Key Actions:
Similar to getExistingHospitals(), it constructs an API URL with DOCTORS_COLLECTION_ID.
Sends a GET request and parses the JSON response.
Maps the response to an array of doctor objects with id and name.
Logs errors if the fetch fails and returns an empty array.

#6. getExistingLocations()
Purpose:Fetches location records from the Webflow CMS (though it appears similar to fetching doctors, it’s designed for location data).
Key Actions:
Constructs an API URL using LOCATION_COLLECTION_ID.
Processes the API response to map locations with id and name.
Error handling is similar to the other fetch functions.

#7. getPODHospitals(hospitalName, hospitals)
Purpose:For a given hospital name that indicates a night shift, this function determines the relevant POD (Point of Delivery) hospitals.
Key Actions:
Strips " Night Shift" from the hospital name to derive the POD identifier.
Filters the list of hospitals to include only those whose location field contains the POD string.
Returns an array of hospital names that match.

#8. addScheduleToWebflow(doctorId, hospitalId, scheduleDate, nightShift, scheduleName, scheduleSlug)
Purpose:Posts a new schedule item to the Webflow CMS.
Key Actions:
Constructs the API URL using SCHEDULES_COLLECTION_ID.
Prepares a payload object containing schedule details:
Schedule name, slug, doctor ID, hospital ID, date, and shift type.
Sends a POST request with the payload as JSON.
Logs the result or errors if the request fails.

#Error Handling & Logging
Logging:The script uses Logger.log() extensively to track the progress and internal state at various points (e.g., before/after API calls, during data processing loops, and when errors occur).
Error Logging:For missing doctors or hospitals, the script appends an error message to the "Errors" sheet with the corresponding row number.
Try-Catch Blocks:Each API fetching function (getExistingHospitals, getExistingDoctors, getExistingLocations) uses try-catch blocks to gracefully handle any exceptions that occur during API calls.

#Configuration & Constants
Constants:The script references several constants (e.g., BASE_URL, HOSPITALS_COLLECTION_ID, DOCTORS_COLLECTION_ID, LOCATION_COLLECTION_ID, SCHEDULES_COLLECTION_ID, TOKEN). These are assumed to be defined elsewhere in the script or project settings.
Time Formatting:Dates are formatted using JavaScript’s toISOString() method. The processed timestamp is further formatted to "YYYY-MM-DD HH:MM:SS" for clarity.








const token = "e4119abfe02da1ebc8f4bb530137a52b11031a3c4a5a390e7d19106acc773ae0";
const HOSPITALS_COLLECTION_ID = "67b6a9e855028f05ee08cfbd";
const DOCTORS_COLLECTION_ID = "67ab08d29b21518a7c784a0d";
const SCHEDULES_COLLECTION_ID = "67b6aa63e506b2e72fd780cb";
const LOCATION_COLLECTION_ID = "67b9a9ef0fdeddf995426129";

var TOKEN = "e4119abfe02da1ebc8f4bb530137a52b11031a3c4a5a390e7d19106acc773ae0";
var BASE_URL = "https://api.webflow.com/v2/collections";

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Remedo Menu")
    .addItem("Add Data", "processScheduleData")
    .addToUi();
}

function processScheduleData() {
  Logger.log("Starting processScheduleData...");
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dec-24");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];

  Logger.log("Fetching hospitals and doctors...");
  var hospitals = getExistingHospitals();
  var doctors = getExistingDoctors();
  var errorSheet = getErrorSheet();

  Logger.log("Processing schedule data...");
  for (var col = 1; col < headers.length; col++) {
    Logger.log("data[0]..." + data[0][col]);
    Logger.log("data[1]..." + data[1][col]);
    if (data[0][col] === "Process this column") {
      Logger.log("Processing column: " + headers[col]);
      var scheduleDate = new Date(data[1][col]);
      Logger.log("Schedule Date: " + scheduleDate);
      // Format scheduleDate as MM/DD/YYYY using the script's timezone
      var formattedDate = scheduleDate.toISOString();

      for (var row = 3; row < data.length; row++) {
        var doctorName = data[row][col];
        var hospitalName = data[row][1];
        var nightShift = /Night Shift/i.test(hospitalName);
        var shiftType = nightShift ? "night shift" : "day shift";
        var scheduleName = doctorName + " at " + hospitalName + " on " + scheduleDate;
        var scheduleSlug = scheduleName.toLowerCase()
          .replace(/\s+/g, '-')      // Replace spaces with hyphens
          .replace(/[^a-z0-9\-]/g, '') // Remove invalid characters
          .replace(/^-+|-+$/g, '');    // Trim leading/trailing hyphens

        Logger.log(`Row ${row + 1}: Doctor: ${doctorName}, Hospital: ${hospitalName}, Night Shift: ${nightShift}`);


        var doctor = doctors.find(d => d.name === doctorName);
        Logger.log(`doctor : ${JSON.stringify(doctor)}`);
        if (!doctor) {
          Logger.log(`Doctor not found: ${doctorName}`);
          errorSheet.appendRow([row + 1, "Doctor not found: " + doctorName]);
          continue;
        }

        var assignedHospitals = nightShift ? getPODHospitals(hospitalName, hospitals) : [hospitalName];

        for (var i = 0; i < assignedHospitals.length; i++) {
          console.log(`assignedHospitals : ${JSON.stringify(assignedHospitals[i])}`);
        }

        assignedHospitals.forEach(function (hospital) {
          var hospitalData = hospitals.find(h => h.name === hospital);
          Logger.log(`Hospital 123: ${JSON.stringify(hospitalData)}`);
          if (!hospitalData) {
            Logger.log(`Hospital not found: ${hospital}`);
            errorSheet.appendRow([row + 1, "Hospital not found: " + hospital]);
            return;
          }

          Logger.log(`Adding schedule for Doctor: ${doctor.id}, Hospital: ${hospitalData.id}, Date: ${scheduleDate}`);
          addScheduleToWebflow(doctor.id, hospitalData.id, formattedDate, nightShift, scheduleName, scheduleSlug);
        });
      }

      // Add timestamp of when the column was processed
      var processedTimestamp = new Date();
      var formattedTimestamp = processedTimestamp.toISOString().replace("T", " ").split(".")[0]; // "YYYY-MM-DD HH:MM:SS"
      Logger.log(`Marking column "${headers[col]}" as processed at ${formattedTimestamp}`);
      sheet.getRange(1, col + 1).setValue(`Already processed`);
      sheet.getRange(1, col + 1).setNote(`Processed on ${formattedTimestamp}`);
    }
  }
  Logger.log("Finished processing schedule data.");
}

function getErrorSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Errors") || spreadsheet.insertSheet("Errors");
  sheet.clear();
  sheet.appendRow(["Row", "Error Message"]);
  return sheet;
}

function getExistingHospitals() {
  var apiUrl = `${BASE_URL}/${HOSPITALS_COLLECTION_ID}/items`;
  var options = {
    method: "GET",
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  try {
    Logger.log("Fetching hospitals from Webflow...");
    var response = UrlFetchApp.fetch(apiUrl, options);
    var data = JSON.parse(response.getContentText());
    Logger.log(`Fetched ${data.items.length} hospitals.`);
    return data.items.map(d => ({ id: d.id, name: d.fieldData.name, location: d.fieldData['location-name'] }));
  } catch (e) {
    Logger.log("Error fetching hospitals: " + e.toString());
    return [];
  }
}

function getExistingDoctors() {
  var apiUrl = `${BASE_URL}/${DOCTORS_COLLECTION_ID}/items`;
  var options = {
    method: "GET",
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  try {
    Logger.log("Fetching doctors from Webflow...");
    var response = UrlFetchApp.fetch(apiUrl, options);
    var data = JSON.parse(response.getContentText());
    Logger.log(`Fetched ${data.items.length} doctors.`);
    return data.items.map(d => ({ id: d.id, name: d.fieldData.name }));
  } catch (e) {
    Logger.log("Error fetching doctors: " + e.toString());
    return [];
  }
}

function getExistingLocations() {
  var apiUrl = `${BASE_URL}/${LOCATION_COLLECTION_ID}/items`;
  var options = {
    method: "GET",
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  try {
    Logger.log("Fetching locations from Webflow...");
    var response = UrlFetchApp.fetch(apiUrl, options);
    var data = JSON.parse(response.getContentText());
    Logger.log(`Fetched ${data.items.length} doctors.`);
    return data.items.map(d => ({ id: d.id, name: d.fieldData.name }));
  } catch (e) {
    Logger.log("Error fetching doctors: " + e.toString());
    return [];
  }
}

function getPODHospitals(hospitalName, hospitals) {
  var pod = hospitalName.replace(" Night Shift", "").trim();
  Logger.log(`Fetching hospitals for POD: ${pod}`);
  var all_locations = hospitals.filter(h => h.location && h.location.includes(pod));
  return all_locations.map(h => h.name);
}

function addScheduleToWebflow(doctorId, hospitalId, scheduleDate, nightShift, scheduleName, scheduleSlug) {
  var apiUrl = `${BASE_URL}/${SCHEDULES_COLLECTION_ID}/items/live`;

  var payload = {
    fieldData: {
      name: scheduleName,
      slug: scheduleSlug,
      doctor: doctorId,
      hospital: hospitalId,
      date: scheduleDate,
      'is-night-shift': nightShift,
    },
  };

  var options = {
    method: "POST",
    contentType: "application/json",
    headers: { Authorization: `Bearer ${TOKEN}` },
    payload: JSON.stringify(payload),
  };

  try {
    Logger.log(`Posting schedule: ${JSON.stringify(payload)}`);
    var response = UrlFetchApp.fetch(apiUrl, options);
    var result = JSON.parse(response.getContentText());
    Logger.log("Schedule added successfully: " + result._id);
  } catch (e) {
    Logger.log("Error adding schedule: " + e.toString());
  }
}
