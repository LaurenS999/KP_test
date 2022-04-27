<?php
  include "../connect.php";

  $uid =  $_POST['user_id'];
  $telp = $_POST['user_phone'];

  $sql = "UPDATE user SET user_phone= ? WHERE user_id = ? ";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('si', $telp, $uid);
  $stmt->execute();

  if ($stmt->affected_rows > 0) {       
     $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Mengganti Nomor telepon!");
     echo json_encode($arr_hasil);
  } 
  else {
    $arr_hasil = array("status"=>false,"pesan"=>"Gagal ganti nomor telepon!");
           echo json_encode($arr_hasil);
        die();
  }
$stmt->close();
$mysqli->close();
?>