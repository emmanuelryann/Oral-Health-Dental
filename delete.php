<?php
$host = "sql203.infinityfree.com";
$user = "if0_39435674";
$pass = "Tochukwu2239";
$db = "if0_39435674_dental_appointments";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Use $_POST instead of reading JSON
if (isset($_POST['action']) && $_POST['action'] === 'delete' && isset($_POST['id'])) {
    $id = intval($_POST['id']);
    $sql = "DELETE FROM appointments WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error: " . $conn->error;
    }

    $stmt->close();
} else {
    echo "Invalid request";
}

$conn->close();
?>