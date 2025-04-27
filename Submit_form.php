<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Set email recipient
    $to = "contact@fitsyncglobal.com"; // Your email address
    $subject = "New Contact Form Submission from $name";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $name <$email>";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "<h1>Thank you for contacting us, $name!</h1><p>We’ll reply soon.</p>";
    } else {
        echo "<h1>Oops! Something went wrong.</h1><p>Please try again later.</p>";
    }
} else {
    header("Location: index.html");
    exit;
}
?>