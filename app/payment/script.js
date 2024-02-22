// JavaScript for payment form (payment/script.js)

// Check if user data is stored
var userData = localStorage.getItem('userData');
if (userData) {
    // If data is found, parse and display it
    userData = JSON.parse(userData);

    // Update the payment page content with user data
    document.getElementById('greeting').textContent = 'Hi ' + userData.name;

    // Call the generateRandomAppID function and display the random app ID
    var appId = document.getElementById('app-id');
    appId.textContent = generateRandomAppID();
    // You can update other elements with user data as needed
}

function generateRandomAppID() {
    var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var randomID = '';
    var length = 10;

    for (var i = 0; i < length; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomID;
}

function startCountdown(duration, display) {
    var timer = duration, minutes, seconds;
    var countdownInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            // Clear the interval and redirect back to the customer details form after 10 minutes
            clearInterval(countdownInterval);
            window.location.href = "../signup/index.html";
        }
    }, 1000);
}

window.onload = function () {
    var tenMinutes = 10 * 60, // 10 minutes in seconds
        display = document.querySelector("#countdown");

    startCountdown(tenMinutes, display);
}

function vibrateDevice() {
    if ("vibrate" in navigator) {
        navigator.vibrate(100); // Vibrate for 100ms
    }
}

function showError() {
    var transactionIdInput = document.getElementById('transaction-id');
    var transactionIdLabel = document.querySelector('label[for="transaction-id"]');

    transactionIdInput.style.border = '1px solid red';
    transactionIdLabel.textContent = 'Enter a valid Transaction ID';
    transactionIdLabel.style.color = 'red';
    vibrateDevice();
}

function checkPayment() {
    var transactionIdInput = document.getElementById('transaction-id');

    if (transactionIdInput.value === '') {
        setTimeout(showError, 2000); // Delay for 2 seconds before showing error
    } else {
        // Perform your payment check logic here

        // For the purpose of this example, always show the error message
        setTimeout(showError, 2000); // Delay for 2 seconds before showing error
    }
}
