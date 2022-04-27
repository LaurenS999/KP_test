<?php
  include "../connect.php";
  include "../bcrypt.php";
  $stmt="";
  $halaman = $_POST['halaman'];  
  if($halaman == "cabang")
  {      
      $storename = $_POST['storename'];
      $storeaddress = $_POST['storeaddress'];
      $storephone = $_POST['storephone'];
      $sql = "INSERT INTO `store`(`store_name`,`store_phone`,`store_address`,`store_latitude`,`store_longitude`,`store_delete`) 
      VALUES (?,?,?,0,0,0)";
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('sis', $storename, $storephone ,$storeaddress);
      $stmt->execute();      
  }
  else if($halaman == "menu")
  {       
      $ext = $_POST['ext'];
      $nama = $_POST['nama'];
      $harga = $_POST['harga'];
      $diskon = $_POST['diskon'];
      $idkategori = $_POST['idkategori'];
      $idcabang = $_POST['idcabang'];
      $desc = $_POST['desc'];
      $stok = $_POST['stok'];
      $default = 0;
      $default1 = 1;

      $sql = "INSERT INTO `menu`(`menu_name`, `menu_desc`, `menu_sell_price`, `menu_discount`, `menu_stok`, `menu_img_ext`, 
      `menu_out_of_stok`, `menu_delete`, `category_id`, `store_id`) VALUES (?,?,?,?,?,?,?,?,?,?)";
      $stmt = $mysqli->prepare($sql);
      if($stok > 0)
      {
        $stmt->bind_param('ssiiisiiii', $nama ,$desc, $harga, $diskon, $stok ,$ext, $default, $default ,$idkategori, $idcabang);
      }
      else
      {
        $stmt->bind_param('ssiiisiiii', $nama ,$desc, $harga, $diskon, $stok ,$ext, $default1, $default ,$idkategori, $idcabang);
      }
      $stmt->execute();
  }
  else if($halaman == "jenispembayaran")
  {      
      $ext = $_POST['ext'];
      $jenispembayaran_nama = $_POST['jenispembayaran_nama'];
      $default = 0;

      $sql = "INSERT INTO payment(payment_name, payment_img_ext, payment_delete) VALUES(?,?,?) ";   
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('ssi', $jenispembayaran_nama, $ext,$default);
      $stmt->execute();
  }
  else if($halaman == "karyawan")
  {      
      $username = $_POST['username'];
      $user_name = $_POST['user_name'];
      $email = $_POST['email'];
      $user_phone = $_POST['user_phone'];
      $user_role = $_POST['user_role'];
      $store_id = $_POST['store_id'];
      $default = 0;
      $password = $_POST['user_password'];
      $bcrypt = new Bcrypt(16);
      $password = $bcrypt->hash($password);

      $sql = "SELECT email from user WHERE email=?";
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('s', $email);
      $stmt->execute();
      $result = $stmt->get_result();
      if ($result->num_rows > 0) {
          $arr_hasil = array("status"=>false,"pesan"=>"Email Sudah Pernah Dipakai");
           echo json_encode($arr_hasil);
          die();
      }
      else
      {
          $sql = "INSERT INTO `user`( `email`, `password`, `uname`, `user_name`, `user_phone`, 
          `user_role`, `user_delete`, `store_id`) VALUES (?,?,?,?,?,?,?,?)";
          $stmt = $mysqli->prepare($sql);
          $stmt->bind_param('ssssssii', $email, $password, $username, $user_name, $user_phone, $user_role, $default, $store_id);
          $stmt->execute();
      }
  }
  else if($halaman == "kategori")
  {    
    $ext = $_POST['ext'];
    $categoryname = $_POST['categoryname'];
    $default = 0;

    $sql = "INSERT INTO  category(category_name, category_img_ext, category_delete) VALUES(?,?,?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ssi', $categoryname, $ext, $default);
    $stmt->execute();
  }
  else if($halaman == "banner")
  {      
      $ext = $_POST['ext'];
      $nama = $_POST['nama'];
      $aim = $_POST['tipe_aim'];
      $aim_id = $_POST['aim_id'];
      $idcabang = $_POST['idcabang'];
      $tanggal = date("Y-m-d");

      if($aim == "kategori")
      {
          $sql = "INSERT INTO `banner`(`banner_name`, `banner_img_ext`, `banner_date_edited`, `banner_delete`, 
          `category_aim_id`, `menu_aim_id`, `store_id`) VALUES (?,?,?,0,?,NULL,?)";          
      }
      else if($aim == "menu")
      {
          $sql = "INSERT INTO `banner`(`banner_name`, `banner_img_ext`, `banner_date_edited`, `banner_delete`, 
          `category_aim_id`, `menu_aim_id`, `store_id`) VALUES (?,?,?,0,NULL,?,?)";      
      }
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('sssii', $nama, $ext ,$tanggal, $aim_id, $idcabang);
      $stmt->execute();
  }  
  if ($stmt->affected_rows > 0) 
  {
      if($halaman == "menu")
      {
          $sql = "SELECT MAX(menu_id) as 'idbaru' from menu";
          $stmt = $mysqli->prepare($sql);
          $stmt->execute();
          $result = $stmt->get_result();              
      }
      else if($halaman == "banner")
      {
          $sql = "SELECT MAX(banner_id) as 'idbaru' from banner";
          $stmt = $mysqli->prepare($sql);
          $stmt->execute();
          $result = $stmt->get_result();          
      }
      else if($halaman == "kategori")
      {
          $sql = "SELECT MAX(category_id) as 'idbaru' from category";
          $stmt = $mysqli->prepare($sql);
          $stmt->execute();
          $result = $stmt->get_result();          
      }
      else if($halaman == "jenispembayaran")
      {
          $sql = "SELECT MAX(payment_id) as 'idbaru' from payment";
          $stmt = $mysqli->prepare($sql);
          $stmt->execute();
          $result = $stmt->get_result();          
      }
      else if($halaman == "karyawan" || $halaman == "cabang")
      {
          $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Menambah " . $halaman);
          echo json_encode($arr_hasil);          
          die();
      }
      if ($result->num_rows > 0) 
          {            
              $i = 0;
              $id = 0;
              while ($row = $result->fetch_assoc()) 
              {
                $id = addslashes(htmlentities($row['idbaru']));              
                $i++;
              }
              $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Menambah " . $halaman, "idbaru"=>$id);
              echo json_encode($arr_hasil);           
      }
      else
      {
          $arr_hasil = array("status"=>false,"pesan"=>"Gagal Menambah");
          echo json_encode($arr_hasil);
      }     
  } 
  else 
  {
    $arr_hasil = array("status"=>false,"pesan"=>$sql);
           echo json_encode($arr_hasil);
        die();
  }
$stmt->close();
$mysqli->close();
?>