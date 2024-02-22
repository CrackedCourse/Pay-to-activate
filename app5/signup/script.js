// Check if user information exists in local storage
var userData = localStorage.getItem('userData');

if (userData) {
    // If data is found, redirect to the payment page
    window.location.href = '../payment/index.html';
} else {
    // If no data is found, proceed with the signup process

    // Rest of the code (validateForm function and other logic) goes here

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

        // Redirect to payment page
        window.location.href = '../payment/index.html';

        return false;
    }
}
