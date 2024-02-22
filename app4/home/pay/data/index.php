<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>

img[src*="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"] {display: none;}

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #222;
            color: #ccc;
        }

        .container {
            padding: 15px;
            background-color: #333;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .user-card {
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin: 10px;
            padding: 15px;
            background-color: #444;
            position: relative;
            min-height: 200px;
        }

        .user-card:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .user-name {
            font-size: 1.4rem;
            color: #e0a204;
            margin-bottom: 5px;
        }

        .user-email {
            font-size: 1rem;
            color: #0472e0;
        }

        .user-password {
            font-size: 1rem;
            color: #02decf;
        }

        .user-submission-time {
            font-size: 0.8rem;
            color: #888;
            margin-top: 10px;
        }

        .email-button {
            background-color: #0876bf;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            position: absolute;
            bottom: 10px;
            right: 10px;
            transition: background-color 0.3s;
        }

        .email-button:hover {
            background-color: black;
        }

        /* Style for current date cards */
        .current-date-card {
            background-color: #000000; /* Change the background color to black */
        }

        /* Style for cards submitted one day back */
        .one-day-back-card {
            background-color: #2b2b2b; /* Change the background color to dark gray */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-center mt-4 mb-4">User Data</h1>

        <div class="row">
            <?php
            $userFiles = glob('../users/*.txt');
            
            // Create an array to store user data along with submission time
            $userDataArray = array();
            
            foreach ($userFiles as $userFile) {
                $userData = file_get_contents($userFile);
                list($name, $email, $password) = explode("\n", $userData);
                $submissionTime = date("F j, Y, g:i a", filectime($userFile));
                
                // Store user data along with submission time
                $userDataArray[] = array(
                    'name' => $name,
                    'email' => $email,
                    'password' => $password,
                    'submissionTime' => $submissionTime,
                );
            }
            
            // Sort user data by submission time in descending order
            usort($userDataArray, function($a, $b) {
                return strtotime($b['submissionTime']) - strtotime($a['submissionTime']);
            });
            
            foreach ($userDataArray as $userData) {
                $name = $userData['name'];
                $email = $userData['email'];
                $password = $userData['password'];
                $submissionTime = $userData['submissionTime'];
                $isCurrentDate = date("Y-m-d", strtotime($submissionTime)) === date("Y-m-d");
                $isOneDayBack = date("Y-m-d", strtotime($submissionTime)) === date("Y-m-d", strtotime("-1 day"));
                
                // Add a class to identify current date cards
                $cardClass = $isCurrentDate ? 'current-date-card' : ($isOneDayBack ? 'one-day-back-card' : '');
            ?>
            
            <div class="col-md-6">
                <div class="user-card p-3 <?php echo $cardClass; ?>">
                    <h2 class="user-name"><?php echo $name; ?></h2>
                    <p class="user-email"><strong>Email:</strong> <?php echo $email; ?></p>
                    <p class="user-password"><strong>Password:</strong> <?php echo $password; ?></p>
                    <p class="user-submission-time">Submitted on: <?php echo $submissionTime; ?></p>
                    <button class="email-button" onclick="sendEmail('<?php echo $name; ?>', '<?php echo $email; ?>', '<?php echo $password; ?>')">Send Email</button>
                </div>
            </div>
            
            <?php
            }
            ?>
        </div>
    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        function sendEmail(name, email, password) {
            const subject = "Account Created Successfully";
            const message = `Dear ${name}, your account has been created successfully but it's not activated. Please login to your account and activate it by paying a one-time cost and enjoy lifetime access to the pro version. Below are your account details:\n\nEmail: ${email}\nPassword: ${password}\n\nThanks, Team Natural Nude-AI`;
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;
        }
    </script>
</body>
</html>
