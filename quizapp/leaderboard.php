<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "modified quizes";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT username, score FROM marks ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$scores = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }
}

$response = [
    "scores" => $scores,
    "totalQuestions" => 5
];

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
