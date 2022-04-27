<?php
  include "../connect.php";

  $uid = $_POST['user_id'];
  $email = $_POST['email'];

  $sql2 = "SELECT email FROM user WHERE email=?";
  $stmt2 = $mysqli->prepare($sql2);
  $stmt2->bind_param('s', $email);
  $stmt2->execute();
  $res = $stmt2->get_result();

  if ($res->num_rows > 0)
  {
      echo json_encode([
          "status" => false,
          "pesan" => "Email has been used!"
      ]);
  }
  else
  {
      $sql = "UPDATE user SET email= ? WHERE user_id = ? ";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('si', $email, $uid);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {       
       $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Mengganti email!");
       echo json_encode($arr_hasil);
    } 
    else {
      $arr_hasil = array("status"=>false,"pesan"=>"Gagal Mengganti email!");
       echo json_encode($arr_hasil);
      die();
    }
  }

$mysqli->close();
?>