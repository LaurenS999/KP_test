<?php
  include "../connect.php";

  $stmt="";
  $halaman =$_POST['halaman'];
  if($halaman == "cabang")
  {
      $id = $_POST['uid'];
      $storename = $_POST['storename'];
      $storeaddress = $_POST['storeaddress'];
      $store_phone = $_POST['store_phone'];
      $sql = "UPDATE store SET store_name = ?, store_address=?, store_phone = ? WHERE store_id= ?";
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('ssii', $storename, $storeaddress, $store_phone, $id);
      $stmt->execute();      
  }

  else if($halaman == "menu")
  { 
      $id = $_POST['uid'];
      $nama = $_POST['nama'];
      $harga = $_POST['harga'];
      $diskon = $_POST['diskon'];
      $desc = $_POST['desc'];
      $idkategori = $_POST['idkategori'];
      $namakategori = $_POST['namakategori'];
      $idcabang = $_POST['idcabang'];
      $ext = $_POST['ext'];

      $sql = "UPDATE menu SET
        menu_name= ? , 
        menu_sell_price= ? ,
        menu_discount= ?,
        menu_desc=?,
        category_id = ?, 
        store_id= ?,
        menu_img_ext = ?
        WHERE menu_id= ?";

      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('siisiisi' ,$nama, $harga, $diskon, $desc  ,$idkategori, $idcabang, $ext ,$id);
      $stmt->execute();
      
  } 

  else if($halaman == "jenispembayaran")
  {
      $id = $_POST['uid'];
      $jenispembayaran_nama = $_POST['jenispembayaran_nama'];
      $ext = $_POST['ext'];

      $sql = "UPDATE payment
              SET payment_name = ?, payment_img_ext = ?
              WHERE payment_id= ?";
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('ssi', $jenispembayaran_nama, $ext ,$id);
      $stmt->execute();
  }
  else if($halaman == "karyawan")
  {
      $id = $_POST['uid'];
      $username = $_POST['username'];
      $user_name = $_POST['user_name'];
      $email = $_POST['email'];
      $user_phone = $_POST['user_phone'];
      
      $user_role = $_POST['user_role'];
      $store_id = $_POST['store_id'];

      $sql = "UPDATE user SET uname = ?, user_name=?, email=?, user_phone=?,user_role=?, store_id=? WHERE user_id= ?";
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('sssssii', $username, $user_name, $email, $user_phone, $user_role, $store_id, $id);
      $stmt->execute();
  }
  else if($halaman == "kategori")
  {
    $id = $_POST['uid'];
    $categoryname = $_POST['categoryname'];
    $ext = $_POST['ext'];    
    $sql = "UPDATE category SET category_name = ?, category_img_ext = ? WHERE category_id= ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ssi' ,$categoryname, $ext, $id);
    $stmt->execute();
  }
  else if($halaman == "banner")
  {
      $id = $_POST['uid'];    
      $nama = $_POST['nama'];
      $aim = $_POST['tipe_aim'];
      $aim_id = $_POST['aim_id'];
      $idcabang = $_POST['idcabang'];
      $tanggal = date("Y-m-d");
      $ext = $_POST['ext'];

      if($aim == "kategori")
      {
          $sql = "UPDATE banner SET banner_name = ?, banner_img_ext = ?, category_aim_id=?, menu_aim_id= null, banner_date_edited=?, store_id=? WHERE banner_id = ?";          
      }
      else if($aim == "menu")
      {
          $sql = "UPDATE banner SET banner_name = ?, banner_img_ext = ?, category_aim_id=null, menu_aim_id= ?, banner_date_edited=?, store_id=? WHERE banner_id = ?";          
      }
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('ssisii', $nama, $ext ,$aim_id, $tanggal, $idcabang ,$id);
      $stmt->execute();
  }
    
  if ($stmt->affected_rows > 0) {       
 $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Mengganti!");
 echo json_encode($arr_hasil);
  } 
  else {
    $arr_hasil = array("status"=>false,"pesan"=>"Gagal Mengganti!");
           echo json_encode($arr_hasil);
        die();
  }
  
  
$stmt->close();
$mysqli->close();
?>