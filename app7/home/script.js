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

        // Automatically upload the selected image
        uploadImage(file);
    }
}

function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    fetch('../uploads/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // No message displayed
    })
    .catch(error => {
        // No message displayed
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

// Attach an event listener to the upload button
document.getElementById('upload-button').addEventListener('click', showProcessingSpinner);