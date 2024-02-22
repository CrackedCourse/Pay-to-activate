// Check if user information exists in local storage
var userData = localStorage.getItem('userData');

if (userData) {
    // If data is found, redirect to the payment page
    window.location.href = '../payment/index.html';
} else {
    // If no data is found, proceed with the signup process

    // Define a function to validate the form
    function validateForm() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;

        if (name.trim() === '') {
            alert('Name is required');
            return false;
        }

        if (email.trim() === '') {
            alert('Email is required');
            return false;
        } else if (!email.match(emailFormat)) {
            alert('Invalid email format');
            return false;
        }

        if (password.trim() === '') {
            alert('Password is required');
            return false;
        }

        // Save user data in localStorage
        var userData = {
            name: name,
            email: email,
            password: password
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Display the processing animation
        var loadingAnimation = document.getElementById('loading-animation');
        loadingAnimation.style.display = 'block';

        // Disable the button to prevent multiple clicks
        var proceedButton = document.getElementById('proceedButton');
        proceedButton.disabled = true;

        // Simulate a processing delay (2 seconds in this example)
        setTimeout(function () {
            // Redirect to the payment page after a delay
            window.location.href = '../payment/index.html';
        }, 3000); // Adjust the delay time as needed

        return false;
    }

    // Add an event listener to the form to call the validateForm function on form submission
    document.getElementById('customer-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        validateForm(); // Call the validateForm function
    });
}
