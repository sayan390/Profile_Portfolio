<?php
if (isset($_POST["Send Message"])) {
    // Safely read POST variables
    $name = $_POST['name'] ?? '';
    $number = $_POST['number'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';


    
// Database connection variables
$host = 'localhost';     // or use 'localhost'
$user = 'root';          // default user for XAMPP
$password = '';          // default password for XAMPP is empty
$database = 'form';      // your database name

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optional: Uncomment this for debugging successful connection
// echo "Connected successfully";





    // Database connection using mysqli (not mysql!)
    $conn = new mysqli("localhost", "root", "", "form",3307);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Use prepared statements for security
    $stmt = $conn->prepare("INSERT INTO contact_form (name, number, email, subject, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sisss", $name, $number, $email, $subject, $message);

    if ($stmt->execute()) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Form  submitted.";
}
?>
