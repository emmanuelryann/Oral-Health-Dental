<?php
$host = "sql203.infinityfree.com";
$user = "if0_39435674";
$pass = "Tochukwu2239";
$db = "if0_39435674_dental_appointments";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = intval($_POST['id']);
$status = $_POST['status'];

$sql = "UPDATE appointments SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $id);
$stmt->execute();

echo "success";

$stmt->close();
$conn->close();
?>