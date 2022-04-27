<?php 
    include "connect.php";
	
	$email = filter_input(INPUT_POST, 'emailregis', FILTER_SANITIZE_STRING);
	$nama = filter_input(INPUT_POST, 'namaregis', FILTER_SANITIZE_STRING);
	$telepon = filter_input(INPUT_POST, 'teleponregis', FILTER_SANITIZE_STRING);
	$user_delete = 0;

    $sql = "SELECT email FROM users WHERE email=?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0)
    {
        echo json_encode([
            "status" => false,
            "msg" => "Email has been used!"
        ]);
    }
    else 
    {
        $sql_insert = "INSERT INTO users(user_name, user_phone, email, user_delete) VALUES (?,?,?,?)";
        $stmt_insert = $mysqli->prepare($sql_insert);
        $stmt_insert->bind_param('sssi', $nama, $telepon, $email, $user_delete);
        $stmt_insert->execute();

        if ($stmt_insert->affected_rows > 0)
        {
            $sql_getuser = "SELECT * FROM users WHERE user_name=? AND user_phone=? AND email=?";
            $stmt_getuser = $mysqli->prepare($sql_getuser);
            $stmt_getuser->bind_param('sss', $nama, $telepon, $email);
            $stmt_getuser->execute();
            $result = $stmt_getuser->get_result();

            $user = array();
            if ($result->num_rows > 0)
            {
                while ($obj = $result->fetch_assoc()) 
                {
                    $user['user_id'] = addslashes(htmlentities($obj['user_id']));
                    break;
                }

                echo json_encode([
                    "status" => true,
                    "msg" => "Success to create account!",
                    "data" => $user
                ]);
            }
            else
            {
                echo json_encode([
                    "status" => false,
                    "msg" => "Failed to create account!"
                ]);
            }
        }
        else
        {
            echo json_encode([
                "status" => false,
                "msg" => "Failed to create account!"
            ]);
        }
    }

	$mysqli->close();
?>