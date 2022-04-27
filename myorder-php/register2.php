<?php 
    include "connect.php";
	
	$username = filter_input(INPUT_POST, 'usernameregis', FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, 'passwordregis', FILTER_SANITIZE_STRING);
    $role = 'Pelanggan';
    $localid = $_GET['id'];

    $sql = "UPDATE users SET username=?, password=?, user_role=? WHERE user_id=?";
	
	$stmt = $mysqli->prepare($sql);
    $stmt->bind_param('sssi', $username, $password, $role, $localid);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0)
    {
        echo json_encode([
        	"status" => true,
        	"msg" => "Register berhasil!"
        ]);
    }
    else 
    {
    	echo json_encode([
    		"status" => false,
    		"msg" => "Register tidak berhasil!"
    	]);
    }

	$mysqli->close();
?>