<?php
  include "../connect.php";  

  $halaman = $_POST['halaman'];
  //$halaman = "cabang";
  if($halaman == "cabang")
  {
      $storename = $_POST['nama'];
      //$storename = "e";
      $sql = "SELECT * from store where store_delete = 0 AND store_name LIKE '%". $storename ."%'";
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 
      
      if ($result->num_rows > 0) {
      $paymenttype = array();
      $i = 0;

        while ($row = $result->fetch_assoc()) {
          $paymenttype[$i]['store_id'] = addslashes(htmlentities($row['store_id']));
          $paymenttype[$i]['store_name'] = addslashes(htmlentities($row['store_name']));  
          $paymenttype[$i]['store_address'] = addslashes(htmlentities($row['store_address']));                  
          $paymenttype[$i]['store_phone'] = addslashes(htmlentities($row['store_phone']));                  
          $i++;
        }
      echo json_encode(array('result' => 'Berhasil', 'data' => $paymenttype));
      }

      else
      {
        echo json_encode(array('result' => 'Gagal'));
        die();
      }
  }

  else if($halaman == "menu")
  {
    $storeid= $_POST['storeid'];    
    $nama = $_POST['nama'];

    if($storeid == "semuaresto")
    {
      $sql = "SELECT * FROM menu WHere menu_delete = 0 AND menu_name LIKE '%" . $nama ."%'";
    }
    else
    {
      $sql = "SELECT * FROM menu WHere menu_delete = 0 AND store_id=" . $storeid . " AND menu_name LIKE '%" . $nama ."%'";      
    }
    $stmt = $mysqli->prepare($sql);  
    $stmt->execute();
    $result = $stmt->get_result(); 
    
    if ($result->num_rows > 0) {
    $menu = array();
      $i = 0;

      while ($row = $result->fetch_assoc()) {
        $menu[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
        $menu[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));   
        $menu[$i]['menu_description'] = addslashes(htmlentities($row['menu_desc']));
        $menu[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));
        $i++;
      }
      echo json_encode($menu);
    } 

    else 
    {
      echo "Gagal Menemukan Menu";
      die();
    }
  }

  else if($halaman == "jenispembayaran")
  {
      $jenispembayaran = $_POST['nama'];
      // $jenispembayaran = "o";
      $sql = "SELECT * from payment where payment_delete = 0 AND payment_name LIKE '%". $jenispembayaran ."%'";
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 
      
      if ($result->num_rows > 0) {
      $paymenttype = array();
      $i = 0;

        while ($row = $result->fetch_assoc()) {
          $paymenttype[$i]['payment_type_id'] = addslashes(htmlentities($row['payment_id']));
          $paymenttype[$i]['payment_type_name'] = addslashes(htmlentities($row['payment_name']));
          $paymenttype[$i]['payment_img_ext'] = addslashes(htmlentities($row['payment_img_ext']));
          $i++;
        }
      echo json_encode(array('result' => 'Berhasil', 'data' => $paymenttype));
      }

      else
      {
        echo json_encode(array('result' => 'Gagal'));
        die();
      }
  } 

  else if($halaman == "karyawan")
  {
      $nama = $_POST['nama'];
      $store_id = $_POST['storeid'];
      // $nama = "ud";
      // $store_id = 1;
      if($store_id== "semuaresto")
      {
        $sql = "SELECT * from user u inner join store s on u.store_id=s.store_id where u.user_name LIKE '%". $nama . "%' ";
      }
      else
      {        
        $sql = "SELECT * from users u inner join store s on u.store_id=s.store_id where u.store_id = ". $store_id ." AND u.user_name LIKE '%". $nama . "%' ";
      }  
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 
      
      if ($result->num_rows > 0) {
      $restodetail = array();
      $i = 0;
        while ($row = $result->fetch_assoc()) {
          $restodetail[$i]['user_id'] = addslashes(htmlentities($row['user_id']));
          $restodetail[$i]['user_name'] = addslashes(htmlentities($row['user_name']));
          $restodetail[$i]['user_phone'] = addslashes(htmlentities($row['user_phone']));
          $restodetail[$i]['user_role'] = addslashes(htmlentities($row['user_role']));
          $restodetail[$i]['store_name'] = addslashes(htmlentities($row['store_name']));
          $i++;
        }
      echo json_encode(array('result' => 'Berhasil', 'data' => $restodetail));
      }
      else {
        echo "Gagal Menemukan Menu";
        die();
      }
  }
  else if($halaman == "kategori")
  {
      $categoryname = $_POST['nama'];
      //$categoryname = "o";
      $sql = "SELECT * from category where category_delete = 0 AND category_name LIKE '%". $categoryname ."%'";
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 
      
      if ($result->num_rows > 0) {
      $paymenttype = array();
      $i = 0;

        while ($row = $result->fetch_assoc()) {
          $paymenttype[$i]['category_id'] = addslashes(htmlentities($row['category_id']));
          $paymenttype[$i]['category_name'] = addslashes(htmlentities($row['category_name']));
          $paymenttype[$i]['category_img_ext'] = addslashes(htmlentities($row['category_img_ext']));
          $i++;
        }
      echo json_encode(array('result' => 'Berhasil', 'data' => $paymenttype));
      }

      else
      {
        echo json_encode(array('result' => 'Gagal'));
        die();
      }
  }
  
$stmt->close();
$mysqli->close();
?>