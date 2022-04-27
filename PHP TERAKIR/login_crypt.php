<?php
	include "bcrypt.php";
	include "connect.php";

	$email = filter_input(INPUT_POST, 'email-login', FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, 'password-login', FILTER_SANITIZE_STRING);

    $sql = "SELECT * FROM user WHERE email=? AND user_delete=0";

    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0)
    {
		function resolve_login($email, $password) 
		{
			include "connect.php";
			$bcrypt = new Bcrypt(16);
			$sql = "SELECT password FROM user WHERE (email = '" . $email . "') AND user_delete = 0";
			$data = $mysqli->query($sql);
			$result = mysqli_fetch_array($data);
			$hash = $result['password'];
			return $bcrypt->verify($password, $hash);
		}

		if (resolve_login($email, $password) == 1)
		{
			$user = array();
			while ($obj = $res->fetch_assoc()) {
				$user['user_id'] = addslashes(htmlentities($obj['user_id']));
				$user['username'] = addslashes(htmlentities($obj['uname']));
				$user['user_name'] = addslashes(htmlentities($obj['user_name']));
				$user['user_phone'] = addslashes(htmlentities($obj['user_phone']));
				$user['email'] = addslashes(htmlentities($obj['email']));
				$user['user_role'] = addslashes(htmlentities($obj['user_role']));
				$user['user_delete'] = addslashes(htmlentities($obj['user_delete']));
				$user['store_id'] = addslashes(htmlentities($obj['store_id']));	
				break;
			}
	
			echo json_encode([
				"status" => true,
				"data" => $user
			]);
		}
		else
		{
			echo json_encode([
				"status" => false,
				"data" => 'Password salah!'
			]);
		}
    }
    else 
    {
    	echo json_encode([
    		"status" => false,
    		"data" => 'User tidak ditemukan!'
    	]);
    }

	$stmt->close();
	$mysqli->close();
?>