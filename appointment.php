<?php
header('Content-Type: application/json');

$host = "sql203.infinityfree.com";
$user = "if0_39435674";
$pass = "Tochukwu2239";
$db = "if0_39435674_dental_appointments";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

$name = $conn->real_escape_string($data->name);
$phone = $conn->real_escape_string($data->phone);
$occurence = $conn->real_escape_string($data->occurence);
$service = $conn->real_escape_string($data->service);
$provider = $conn->real_escape_string($data->provider);
$date = $conn->real_escape_string($data->date);
$time = $conn->real_escape_string($data->time);

$sql = "INSERT INTO appointments (full_name, phone_number, visited_before, service, provider, appointment_date, appointment_time)
        VALUES ('$name', '$phone', '$occurence', '$service', '$provider', '$date', '$time')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>
