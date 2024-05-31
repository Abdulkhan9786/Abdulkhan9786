<script>
document.addEventListener('DOMContentLoaded', () => {
  // Phone number field setup
  const phoneNumberField = document.getElementById("form-field-phone");
  phoneNumberField.setAttribute('maxlength', '10');
  phoneNumberField.setAttribute('pattern', '^[1-9]{1}[0-9]{9}');
  phoneNumberField.addEventListener("input", validatePhoneNumber);
  phoneNumberField.addEventListener('keypress', restrictNumbers);

  function validatePhoneNumber(event) {
    const phoneNumberField = event.target;
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(phoneNumberField.value)) {
      phoneNumberField.setCustomValidity('Invalid input. Please provide a valid mobile number with a maximum length of 10 characters.');
    } else {
      phoneNumberField.setCustomValidity('');
    }
  }

  function restrictNumbers(event) {
    const keyCode = event.which || event.keyCode;
    const char = String.fromCharCode(keyCode);
    const allowedCharacters = /[0-9\b\t]/;
    if (!allowedCharacters.test(char)) {
      event.preventDefault();
    }
  }

  // Text field setup
  const textField = document.getElementById("form-field-text");
  textField.setAttribute('maxlength', '50'); // Set maximum length if needed
  textField.setAttribute('pattern', '^[a-zA-Z\s]+$'); // Only allow letters and spaces
  textField.addEventListener("input", validateText);
  textField.addEventListener('keypress', restrictNonAlphabets);

  function validateText(event) {
    const textField = event.target;
    const textRegex = /^[a-zA-Z\s]+$/;
    if (!textRegex.test(textField.value)) {
      textField.setCustomValidity('Invalid input. Please provide text only.');
    } else {
      textField.setCustomValidity('');
    }
  }

  function restrictNonAlphabets(event) {
    const keyCode = event.which || event.keyCode;
    const char = String.fromCharCode(keyCode);
    const allowedCharacters = /[a-zA-Z\s]/;
    if (!allowedCharacters.test(char)) {
      event.preventDefault();
    }
  }
});

</script>
