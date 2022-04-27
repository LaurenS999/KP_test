<?php
	include "../connect.php";
	include "../bcrypt.php";
	
	// $uid = 1;
	// $oldpass = 'tes';
	// $newpass = 'tes';

	$uid = $_POST['user_id'];
	$oldpass = $_POST['oldpass'];
	$newpass = $_POST['newpass'];

	$sql = "SELECT * FROM user WHERE user_id = ? AND user_delete = 0";
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param('i', $uid);
	$stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0)
    {
		function resolve_changepass($id, $password) 
		{
			include "../connect.php";
			$bcrypt = new Bcrypt(16);
			$sql = "SELECT password FROM user WHERE (user_id = '" . $id . "') AND user_delete = 0";
			$data = $mysqli->query($sql);
			$result = mysqli_fetch_array($data);
			$hash = $result['password'];
			return $bcrypt->verify($password, $hash);
		}

		if (resolve_changepass($uid, $oldpass) == 1)
		{
			$bcrypt = new Bcrypt(16);
			$password = $bcrypt->hash($newpass);

			$sql_update = "UPDATE user set password=? WHERE user_id=?";
			$stmt_update = $mysqli->prepare($sql_update);
			$stmt_update->bind_param('si', $password, $uid);
			$stmt_update->execute();

			if ($stmt_update->affected_rows > 0)
			{
				echo json_encode([
	    			"status" => true,
	    			"data" => 'Berhasil mengganti password!'
	    		]);
			}
			else
			{
				echo json_encode([
	    			"status" => false,
	    			"data" => 'Gagal mengganti password!'
	    		]);
			}
		}
		else
		{
			echo json_encode([
    			"status" => false,
    			"data" => 'Password lama salah!'
    		]);
		}
    }
    else
    {
    	echo json_encode([
    		"status" => false,
    		"data" => 'User tidak ditemukan'
    	]);
    }

    $stmt->close();
	$mysqli->close();
?>