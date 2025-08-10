<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "modified quizes";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['username']) && isset($data['score'])) {
    $username = $conn->real_escape_string($data['username']);
    $score = (int) $data['score'];

    $sql = "INSERT INTO marks (username, score) VALUES ('$username', $score)";
    if ($conn->query($sql)) {
        echo "Score saved successfully!";
    } else {
        echo "Database Error: " . $conn->error;
    }
} else {
    echo "Missing username or score!";
}

$conn->close();
?>
