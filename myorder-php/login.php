<?php
	include "connect.php";

	$email = filter_input(INPUT_POST, 'emaillogin', FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, 'passwordlogin', FILTER_SANITIZE_STRING);

    $sql = "SELECT * FROM users WHERE email=? and password=? AND user_delete=0";

    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ss', $email, $password);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0)
    {
    	$user = array();
    	while ($obj = $res->fetch_assoc()) {
    		$user['user_id'] = addslashes(htmlentities($obj['user_id']));
			$user['username'] = addslashes(htmlentities($obj['username']));
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
    		"msg" => "Email dan/atau password Anda salah!"
    	]);
    }

	$stmt->close();
	$mysqli->close();
?>