<?php
  include "../connect.php";

  $uid =  $_POST['user_id'];
  $nama = $_POST['nama'];

  $sql = "UPDATE users SET user_name= ? WHERE user_id = ? ";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('si', $nama, $uid);
  $stmt->execute();

  if ($stmt->affected_rows > 0) {       
     $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Mengganti Nama!");
     echo json_encode($arr_hasil);
  } 
  else {
    $arr_hasil = array("status"=>false,"pesan"=>"Gagal ganti nama!");
           echo json_encode($arr_hasil);
        die();
  }
$stmt->close();
$mysqli->close();
?>