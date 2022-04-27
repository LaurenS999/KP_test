<?php
  include "../connect.php";

  $uid = $_POST['user_id'];
  $oldpass = $_POST['oldpass'];
  $newpass = $_POST['newpass'];
  
    $sql = "SELECT * FROM users WHERE user_id = ? AND password = ?";

    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('is', $uid, $oldpass);    
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) 
    {
        $sql2 = "UPDATE users SET password= ? WHERE user_id = ? AND password = ? ";
        $stmt2 = $mysqli->prepare($sql2);
        $stmt2->bind_param('sis', $newpass, $uid, $oldpass);
        $stmt2->execute();

        if ($stmt2->affected_rows > 0) {       
           $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Mengganti Password!");
           echo json_encode($arr_hasil);
        } 
        else 
        {
          $arr_hasil = array("status"=>false,"pesan"=>"Gagal Mengganti Password!");
           echo json_encode($arr_hasil);
          //echo "Gagal mengganti Password! Password baru kosong!";
          die();
        }
    }
    else 
    {
        $arr_hasil = array("status"=>false,"pesan"=>"Gagal Mengganti Password! Password lama salah/kosong!");
           echo json_encode($arr_hasil);
        die();
    }
$mysqli->close();
?>

