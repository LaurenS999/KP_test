<?php
  include "../connect.php";

  $id = $_POST['uid'];
  $role = $_POST['role'];
  $status = $_POST['status'];

  if ($role == "Pelanggan" && $status == "Proses")
  {
    $sql = "SELECT * FROM transaction t left join user u on t.driver_id=u.user_id WHERE transaction_status NOT LIKE 'Selesai' AND t.customer_id = " . $id." ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
  }
  else if($role == "Pelanggan" && $status == "Selesai")
  {
    $sql = "SELECT * from transaction t left join user u ON t.driver_id =u.user_id where transaction_status='Selesai' AND customer_id=" . $id." ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
  }
  else if ($role == "Driver" && $status == "Proses")
  {
    $sql = "SELECT * FROM transaction t inner join user u on t.customer_id=u.user_id WHERE t.driver_id = " . $id . " AND t.transaction_status='Sedang Diproses' ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
  }
  else if ($role == "Driver" && $status == "Kirim")
  {
    $sql = "SELECT * FROM transaction t inner join user u on t.customer_id=u.user_id WHERE t.driver_id = ". $id ." AND t.transaction_status='Sedang Dikirim' ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
  }
  else if ($role == "Kasir" && $status == "Masuk" )
  {
    $store_id = $_POST['storeId'];    
    $sql = "SELECT * FROM transaction t inner join user u on t.customer_id=u.user_id WHERE t.store_id = ". $store_id ." AND  (transaction_status='Menunggu Konfirmasi' OR transaction_status='Sedang Diproses') AND (t.cashier_id is null OR t.cashier_id =".$id.") ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
  }
  else if ($role == "Kasir" && $status == "Kirim")
  {
    $store_id = $_POST['storeId'];    
    $sql = "SELECT t.*, ud.user_name as 'driver_nama', uc.user_name as 'pelanggan_nama' from transaction t inner join user ud ON t.driver_id =ud.user_id inner join user uc on t.customer_id=uc.user_id where t.store_id = ". $store_id ." AND t.transaction_status='Sedang Dikirim' AND t.cashier_id = " . $id . " ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
  }

  else if ($role == "Admin" && $status == "Masuk" )
  {
    $store_id = $_POST['storeId'];
    $sql = "SELECT * FROM transaction t inner join user u on t.customer_id=u.user_id WHERE transaction_status='Menunggu Konfirmasi' AND t.store_id =" . $store_id. " ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
  }
  else if ($role == "Admin" && $status == "Kirim" )
  {
    $store_id = $_POST['storeId'];    
    $sql = "SELECT t.*, ud.user_name as 'driver_nama', uc.user_name as 'pelanggan_nama' from transaction t inner join user ud ON t.driver_id =ud.user_id inner join user uc on t.customer_id=uc.user_id where transaction_status='Sedang Dikirim' AND t.store_id= " . $store_id. " ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";
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
        $pesanan[$i]['transaction_status'] = addslashes(htmlentities($row['transaction_status']));
        $pesanan[$i]['transaction_order_number'] = addslashes(htmlentities($row['transaction_order_number']));

        if($role == "Kasir" && $status == "Kirim" || $role == "Admin" && $status == "Kirim" )
        {
          $pesanan[$i]['driver_nama'] = addslashes(htmlentities($row['driver_nama']));
          $pesanan[$i]['pelanggan_nama'] = addslashes(htmlentities($row['pelanggan_nama']));
        }
        else
        {
          $pesanan[$i]['user_name'] = addslashes(htmlentities($row['user_name']));
        }
      $i++;

	}
	echo json_encode(array('result' => 'Berhasil', 'data' => $pesanan));
}

else {
	echo json_encode(array('result' => 'Gagal'));
  die();
}
  	$stmt->close();
$mysqli->close();
?>
