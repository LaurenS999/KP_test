<?php
  include "../connect.php";

  $role = $_POST['role'];
  if ($role == "Driver")
  {
    $id = $_POST['uid'];
    $sql = "SELECT t.*, u.user_name from transaction t inner join user u ON t.driver_id =u.user_id where transaction_status='Selesai' AND transaction_delete = 0 AND driver_id= ". $id ." ORDER BY t.transaction_date DESC, t.transaction_order_number DESC ";
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 
      
      if ($result->num_rows > 0) {
      $pesanan = array();
      $i = 0;

        while ($row = $result->fetch_assoc()) {
            $pesanan[$i]['transaction_id'] = addslashes(htmlentities($row['transaction_id']));
            $pesanan[$i]['transaction_date'] = addslashes(htmlentities($row['transaction_date']));
            $pesanan[$i]['transaction_time'] = addslashes(htmlentities($row['transaction_time']));
            $pesanan[$i]['transaction_status'] = addslashes(htmlentities($row['transaction_status']));        
            $pesanan[$i]['transaction_order_number'] = addslashes(htmlentities($row['transaction_order_number']));        
            $pesanan[$i]['driver_id'] = addslashes(htmlentities($row['driver_id']));
            $pesanan[$i]['user_name'] = addslashes(htmlentities($row['user_name']));        
          $i++;
      }
      echo json_encode(array('result' => 'Berhasil', 'data' => $pesanan));
    }

    else {
      echo json_encode(array('result' => 'Gagal'));
      die();
    }
  }
   
  else if ($role == "Kasir")
  {
    $id = $_POST['uid'];    
    $tanggal1 = $_POST['tanggal1'];
    $tanggal2 = $_POST['tanggal2'];
    // $tanggal1 = "2020-01-01";
    // $tanggal2 = "2020-10-31";
    $sql = "SELECT t.* ,uk.user_name AS 'KasirName' FROM transaction t left join user u on t.customer_id=u.user_id left join user uk on t.cashier_id=uk.user_id WHERE t.transaction_status='Selesai'  AND transaction_delete = 0 AND t.cashier_id= ". $id." AND t.transaction_date BETWEEN '". $tanggal1 ."' AND '". $tanggal2 ."' ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 
      
      if ($result->num_rows > 0) {
      $pesanan = array();
      $i = 0;

        while ($row = $result->fetch_assoc()) {
            $pesanan[$i]['transaction_id'] = addslashes(htmlentities($row['transaction_id']));
            $pesanan[$i]['transaction_date'] = addslashes(htmlentities($row['transaction_date']));
            $pesanan[$i]['transaction_time'] = addslashes(htmlentities($row['transaction_time']));
            $pesanan[$i]['transaction_status'] = addslashes(htmlentities($row['transaction_status'])); 
            $pesanan[$i]['transaction_order_number'] = addslashes(htmlentities($row['transaction_order_number']));                  
            $pesanan[$i]['transaction_total_amount'] = addslashes(htmlentities($row['transaction_total_amount']));                  
            $pesanan[$i]['KasirName'] = addslashes(htmlentities($row['KasirName']));
            $pesanan[$i]['transaction_customer_name'] = addslashes(htmlentities($row['transaction_customer_name']));            
            $i++;            
      }
      echo json_encode(array('result' => 'Berhasil', 'data' => $pesanan));
    }

    else {
      echo json_encode(array('result' => 'Gagal'));
      die();
    }
  }

  else if($role == "Admin")
  {
    $tanggal1 = $_POST['tanggal1'];
    $tanggal2 = $_POST['tanggal2'];
    $store_id = $_POST['store'];
    
    if($store_id == "semuaresto")
    {
       $sql = "SELECT t.*,uk.user_name AS 'KasirName' 
            FROM transaction t left join user u on t.customer_id=u.user_id 
            left join user uk on t.cashier_id=uk.user_id 
            WHERE t.transaction_status='Selesai'  AND transaction_delete = 0 AND t.transaction_date BETWEEN '". 
            $tanggal1 ."' AND '".$tanggal2."' ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
    }
    else
    {
       $sql = "SELECT t.* ,uk.user_name AS 'KasirName' 
            FROM transaction t
            left join user uk on t.cashier_id=uk.user_id 
            WHERE t.transaction_status='Selesai' AND t.store_id = ". $store_id ." AND t.transaction_date BETWEEN '". 
            $tanggal1 ."' AND '".$tanggal2."' ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
    }
   
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 
      
      if ($result->num_rows > 0) {
      $pesanan = array();
      $i = 0;

        while ($row = $result->fetch_assoc()) {
            $pesanan[$i]['transaction_id'] = addslashes(htmlentities($row['transaction_id']));
            $pesanan[$i]['transaction_date'] = addslashes(htmlentities($row['transaction_date']));
            $pesanan[$i]['transaction_time'] = addslashes(htmlentities($row['transaction_time']));
            $pesanan[$i]['transaction_total_amount'] = addslashes(htmlentities($row['transaction_total_amount']));                  
            $pesanan[$i]['transaction_order_number'] = addslashes(htmlentities($row['transaction_order_number']));                  
            $pesanan[$i]['transaction_status'] = addslashes(htmlentities($row['transaction_status']));        
            $pesanan[$i]['KasirName'] = addslashes(htmlentities($row['KasirName']));
            $pesanan[$i]['transaction_customer_name'] = addslashes(htmlentities($row['transaction_customer_name']));
          $i++;
      }
      echo json_encode(array('result' => 'Berhasil', 'data' => $pesanan));
    }

    else {
      echo json_encode(array('result' => 'Gagal'));
      die();
    }
  }



$stmt->close();
$mysqli->close();
?>
