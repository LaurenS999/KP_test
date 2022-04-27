<?php
  include "../connect.php";

  $id = $_POST['uid'];
  $halaman = $_POST['halaman'];

  if($halaman == "cabang")
  {
    $sql = "UPDATE store SET store_delete=1 WHERE store_id= ?";
  }
  else if($halaman == "menu")
  {
    $sql = "UPDATE menu SET menu_delete= 1 WHERE menu_id= ?";    
  }
  else if($halaman == "jenispembayaran")
  {
     $sql = "UPDATE payment SET payment_delete = 1 WHERE payment_id= ?";
  } 
  else if($halaman == "karyawan")
  {
    $sql = "UPDATE user SET user_delete = 1 WHERE user_id= ?";
  }
  else if($halaman == "kategori")
  {
    $sql = "UPDATE category SET category_delete = 1 WHERE category_id= ?";    
  }
  else if($halaman == "banner")
  {
    $sql = "UPDATE banner SET banner_delete = 1 WHERE banner_id= ?";    
  }
  else if($halaman == "riwayat")
  {
    $sql = "UPDATE transaction SET transaction_delete = 1 WHERE transaction_id= ?";        
  }
  
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('s', $id);
  $stmt->execute();
  if ($stmt->affected_rows > 0) {       
     $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Menghapus!");
     echo json_encode($arr_hasil);
  } 
  else {
    $arr_hasil = array("status"=>false,"pesan"=>$sql);
           echo json_encode($arr_hasil);
        die();
  }  
  
$stmt->close();
$mysqli->close();
?>