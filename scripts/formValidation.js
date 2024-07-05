const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("r");

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.innerHTML = range.value;
}

document.addEventListener('DOMContentLoaded', function () {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const emailField = document.getElementById('email');
    const form = document.querySelector('.wf1');
    const submitButton = form.querySelector('input[type="submit"]');

    function validatePasswords() {
        const passwordValue = password.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();

        if (passwordValue !== confirmPasswordValue) {
            confirmPassword.setCustomValidity('Passwords do not match');
            emailField.disabled = true; // Disable email field if passwords do not match
        } else {
            confirmPassword.setCustomValidity('');
            emailField.disabled = false; // Enable email field if passwords match
        }
    }

    confirmPassword.addEventListener('input', validatePasswords);

    form.addEventListener('submit', function (event) {
        validatePasswords(); // Validate passwords before submission
        if (!this.checkValidity()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    // Disable submit button until passwords match
    confirmPassword.addEventListener('input', function () {
        submitButton.disabled = !form.checkValidity();
    });

    // Prevent form submission on Enter key press if passwords don't match
    form.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !form.checkValidity()) {
            event.preventDefault();
            validatePasswords(); // Validate passwords on Enter key press
        }
    });
});