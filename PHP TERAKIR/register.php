<?php
include 'connect.php';
include "bcrypt.php";

$email = $_POST['email'];
$password = $_POST['password'];
$uname = $_POST['uname'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$role = $_POST['role'];
$user_delete = $_POST['udelete'];

$sql = "SELECT email from user WHERE email=?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('s', $email);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows > 0)
{
	echo json_encode([
		'status' => false,
		'data' => "Email sudah pernah terdaftar!"
	]);
}
else
{
	$bcrypt = new Bcrypt(16);
	$password = $bcrypt->hash($password);

	$sql2 = "INSERT INTO user(email, password, uname, user_name, user_phone, user_role, user_delete) VALUES (?,?,?,?,?,?,?)";
	$stmt2 = $mysqli->prepare($sql2);
	$stmt2->bind_param('ssssssi', $email, $password, $uname, $name, $phone, $role, $user_delete);
	$stmt2->execute();

	if ($stmt2->affected_rows > 0)
	{
		echo json_encode([
			'status' => true,
			'data' => "Berhasil mendaftarkan akun!"
		]);
	}
	else
	{
		echo json_encode([
			'status' => false,
			'data' => "Gagal mendaftarkan akun!"
		]);
	}
}

$stmt->close();
$mysqli->close();
?>