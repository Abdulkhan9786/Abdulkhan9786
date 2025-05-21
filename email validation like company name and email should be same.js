<script>
document.addEventListener('DOMContentLoaded',() => {
  const phoneNumberField = document.getElementById("form-field-message");
  phoneNumberField.setAttribute('maxlength', '10');
  phoneNumberField.setAttribute('pattern', '^[1-9]{1}[0-9]{9}');
  phoneNumberField.addEventListener("input", validatePhoneNumber);
  phoneNumberField.addEventListener('keypress', restrictAlphabets);
function validatePhoneNumber(event) {
  const phoneNumberField = event.target;
  const errorMessage= document.getElementById('message');
  const maxlength=10;
  const phoneNumberRegex = /^\d{10}$/;
  if (!phoneNumberRegex.test(phoneNumberField.value)) {
    phoneNumberField.setCustomValidity('Invalid input. Please provide a valid mobile number with a maximum length of 10 characters.');
}else{
    phoneNumberField.setCustomValidity('');
  }
}
  function restrictAlphabets(event) {
    const keyCode = event.which || event.keyCode;
    const char = String.fromCharCode(keyCode);
    const allowedCharacters = /[0-9\b\t]/;
    if (!allowedCharacters.test(char)) {
      event.preventDefault();
    }
  } 
});
  </script>
  
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
$(document).ready(function() {
    const $form = $('.elementor-form');
    const $companyNameInput = $form.find('#form-field-field_4a6a186');
    const $emailInput = $form.find('#form-field-email');
    const $errorMessage = $('<div>', {
        class: 'company-email-error',
        css: {
            color: 'red',
            marginTop: '5px'
        }
    });

    if (!$form.length || !$companyNameInput.length || !$emailInput.length) return;

    const generateValidDomains = (companyName) => {
        const companyParts = companyName.split(/\s+/).map(word => word.toLowerCase());
        const validDomains = new Set(companyParts);
        for (let i = 0; i < companyParts.length; i++) {
            for (let j = i + 1; j < companyParts.length; j++) {
                validDomains.add(companyParts[i] + companyParts[j]);
                validDomains.add(companyParts[j] + companyParts[i]);
            }
        }
        for (let i = 0; i < companyParts.length; i++) {
            for (let j = i + 1; j < companyParts.length; j++) {
                for (let k = j + 1; k < companyParts.length; k++) {
                    validDomains.add(companyParts[i] + companyParts[j] + companyParts[k]);
                    validDomains.add(companyParts[i] + companyParts[k] + companyParts[j]);
                    validDomains.add(companyParts[j] + companyParts[i] + companyParts[k]);
                    validDomains.add(companyParts[j] + companyParts[k] + companyParts[i]);
                    validDomains.add(companyParts[k] + companyParts[i] + companyParts[j]);
                    validDomains.add(companyParts[k] + companyParts[j] + companyParts[i]);
                }
            }
        }

        return Array.from(validDomains);
    };

    const removeErrorMessage = () => {
        $form.find('.company-email-error').remove();
    };

    const validateEmail = (email) => {
        const companyName = $companyNameInput.val().trim().toLowerCase();
        if (!companyName) return;

        const [_, domain] = email.split("@");
        if (!domain || !domain.includes(".")) return null;

        const emailDomain = domain.split(".")[0].replace(/[^a-z]/g, ""); // Clean domain part
        const validDomains = generateValidDomains(companyName);

        return validDomains.includes(emailDomain);
    };

    // Function to handle input events on the email field
    const handleEmailInput = () => {
        removeErrorMessage();
        const email = $emailInput.val().trim().toLowerCase();

        if (!validateEmail(email)) {
            $errorMessage.text("Kindly provide organisation Email");
            $emailInput.parent().append($errorMessage);
        }
    };

    const handleEmailFocusOut = (event) => {
        removeErrorMessage();

        const email = $emailInput.val().trim().toLowerCase();

        // If the email is empty, allow focusout
        if (!email) return;

        if (!validateEmail(email)) {
            $emailInput.val(''); // Clear the email input field
            $errorMessage.text("Kindly provide organisation Email");
            $emailInput.parent().append($errorMessage);
            event.preventDefault(); // Prevent moving to the next field
        }
    };

    // Add event listeners
    $emailInput.on('input', handleEmailInput);
    $emailInput.on('focusout', handleEmailFocusOut);
});
</script>
<style>
    .flatpickr-time input {
        color:black !important;
    }
</style>
