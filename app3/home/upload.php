<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the "uploads" directory exists, create it if not
    if (!file_exists('uploads')) {
        mkdir('uploads', 0777, true);
    }

    if (isset($_FILES['image'])) {
        $file = $_FILES['image'];

        if ($file['error'] === UPLOAD_ERR_OK) {
            $destination = 'uploads/' . basename($file['name']);

            if (move_uploaded_file($file['tmp_name'], $destination)) {
                $response = array('success' => true);
            } else {
                $response = array('success' => false);
            }
        } else {
            $response = array('success' => false);
        }
    } else {
        $response = array('success' => false);
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo 'Invalid request method.';
}
?>
