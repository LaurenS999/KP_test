<?php
  include "../connect.php";

  $id = $_POST['uid'];

  $sql = "SELECT t.*, uc.user_name AS 'pelanggan_nama', uc.user_phone AS 'pelanggan_telepon', uk.user_name AS 'kasir_nama', ud.user_name AS 'driver_nama', p.payment_name as 'payment_nama', td.menu_id, m.menu_name, m.menu_img_ext ,td.transaction_detail_count, td.transaction_detail_price, td.transaction_detail_discount FROM transaction t left join user uc on t.customer_id=uc.user_id left join user uk ON t.cashier_id=uk.user_id left join user ud on t.driver_id=ud.user_id left join payment p ON t.payment_id=p.payment_id left join transaction_detail td on t.transaction_id = td.transaction_id left join menu m on td.menu_id = m.menu_id WHERE t.transaction_id = " . $id;

  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$pesanan = array();
  $menu = array();
  $i = 0;  

    while ($row = $result->fetch_assoc()) {
      $pesanan[0]['transaction_id'] = addslashes(htmlentities($row['transaction_id']));
      $pesanan[0]['transaction_date'] = addslashes(htmlentities($row['transaction_date']));
      $pesanan[0]['transaction_time'] = addslashes(htmlentities($row['transaction_time']));
      $pesanan[0]['transaction_status'] = addslashes(htmlentities($row['transaction_status']));
      $pesanan[0]['transaction_delivery_status'] = addslashes(htmlentities($row['transaction_delivery_status']));
      $pesanan[0]['transaction_address'] = addslashes(htmlentities($row['transaction_address']));        
      $pesanan[0]['transaction_message'] = addslashes(htmlentities($row['transaction_message']));      
      $pesanan[0]['transaction_total_discount'] = addslashes(htmlentities($row['transaction_total_discount']));
      $pesanan[0]['transaction_delivery_fee_total'] = addslashes(htmlentities($row['transaction_delivery_fee_total']));
      $pesanan[0]['jenisPembayaran'] = addslashes(htmlentities($row['payment_nama']));
      $pesanan[0]['transaction_order_number'] = addslashes(htmlentities($row['transaction_order_number']));
      $pesanan[0]['transaction_latitude'] = addslashes(htmlentities($row['transaction_latitude']));
      $pesanan[0]['transaction_longitude'] = addslashes(htmlentities($row['transaction_longitude']));
      //pelanggan
      $pesanan[0]['pelanggan_nama'] = addslashes(htmlentities($row['pelanggan_nama']));
      $pesanan[0]['transaction_total_amount'] = addslashes(htmlentities($row['transaction_total_amount']));
      $pesanan[0]['pelanggan_telepon'] = addslashes(htmlentities($row['pelanggan_telepon']));
      //KASIR
      $pesanan[0]['kasir_nama'] = addslashes(htmlentities($row['kasir_nama']));
      //DRIVER
      $pesanan[0]['driver_nama'] = addslashes(htmlentities($row['driver_nama']));      
      //MENU
      $menu[$i]['menu_id'] =addslashes(htmlentities($row['menu_id']));        
      $menu[$i]['menuNama'] =addslashes(htmlentities($row['menu_name']));
      $menu[$i]['menu_img_ext'] =addslashes(htmlentities($row['menu_img_ext']));
      $menu[$i]['transaction_detail_count'] =addslashes(htmlentities($row['transaction_detail_count']));
      $menu[$i]['transaction_detail_price'] =addslashes(htmlentities($row['transaction_detail_price']));
      $menu[$i]['transaction_detail_discount'] =addslashes(htmlentities($row['transaction_detail_discount']));
      $i++;
    }  

	echo json_encode(array('result' => 'Berhasil', 'data' => $pesanan, 'menu' => $menu));
}

else {
	echo json_encode(array('result' => 'Gagal', 'data' => $sql));
  die();
}
  	$stmt->close();
$mysqli->close();
?>