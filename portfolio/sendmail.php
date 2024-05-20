<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if form is submitted
    if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        $to = "your_email@example.com"; // Replace with your email
        $subject = "New Contact Form Submission";
        $body = "Name: $name\nEmail: $email\nMessage:\n$message";

        // Set headers
        $headers = "From: $email";

        // Send email
        if(mail($to, $subject, $body, $headers)){
            echo "Message sent successfully!";
        } else{
            echo "Failed to send message.";
        }
    }
}
?>
