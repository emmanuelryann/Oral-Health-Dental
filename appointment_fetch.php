<?php

$host = "sql203.infinityfree.com";
$user = "if0_39435674";
$pass = "Tochukwu2239";
$db = "if0_39435674_dental_appointments";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM appointments ORDER BY created_at ASC";
$result = $conn->query($sql);

$appointments = [];

while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}

header('Content-Type: application/json');
echo json_encode($appointments);

$conn->close();
?>
