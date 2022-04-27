<?php
  include "../connect.php";

  $id = $_POST['uid'];
  //$id=3;
  $sql = "SELECT t.*, u.user_name as driver, uk.user_name as Kasir, uc.user_name as customer_nama ,uc.user_phone as customer_phone ,p.payment_name as jenisPembayaran, td.*, m.menu_name as menuNama, m.menu_id, m.menu_img_ext
  		from transaction t 
      left join user u ON t.driver_id =u.user_id 
  		left join user uk ON uk.user_id=t.cashier_id 
      left join user uc ON uc.user_id=t.customer_id       
      left join payment p on t.payment_id = p.payment_id 
  		left join transaction_detail td on t.transaction_id= td.transaction_id 
  		left join menu m on m.menu_id=td.menu_id where t.transaction_id=" . $id ;

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
        $pesanan[$i]['transaction_delivery_status'] = addslashes(htmlentities($row['transaction_delivery_status']));
        $pesanan[$i]['transaction_address'] = addslashes(htmlentities($row['transaction_address']));        
        $pesanan[$i]['transaction_message'] = addslashes(htmlentities($row['transaction_message']));
        $pesanan[$i]['transaction_total_amount'] = addslashes(htmlentities($row['transaction_total_amount']));
        $pesanan[$i]['transaction_total_discount'] = addslashes(htmlentities($row['transaction_total_discount']));                
        $pesanan[$i]['transaction_latitude'] = addslashes(htmlentities($row['transaction_latitude']));
        $pesanan[$i]['transaction_longitude'] = addslashes(htmlentities($row['transaction_longitude']));                
        $pesanan[$i]['transaction_total_paid'] = addslashes(htmlentities($row['transaction_total_paid']));                
        $pesanan[$i]['transaction_total_change'] = addslashes(htmlentities($row['transaction_total_change']));
        $pesanan[$i]['transaction_order_number'] = addslashes(htmlentities($row['transaction_order_number']));
        
        $pesanan[$i]['customer_nama'] = addslashes(htmlentities($row['transaction_customer_name']));
        $pesanan[$i]['customer_phone'] = addslashes(htmlentities($row['customer_phone']));

        $pesanan[$i]['driver_name'] = addslashes(htmlentities($row['driver']));
        $pesanan[$i]['Kasir_name'] = addslashes(htmlentities($row['Kasir']));     
        $pesanan[$i]['jenisPembayaran'] = addslashes(htmlentities($row['jenisPembayaran']));

        $pesanan[$i]['menu_id'] =addslashes(htmlentities($row['menu_id']));
        $pesanan[$i]['menuNama'] =addslashes(htmlentities($row['menuNama']));
        $pesanan[$i]['menu_img_ext'] = addslashes(htmlentities($row['menu_img_ext']));      

        $pesanan[$i]['transaction_detail_count'] =addslashes(htmlentities($row['transaction_detail_count']));
        $pesanan[$i]['transaction_detail_price'] =addslashes(htmlentities($row['transaction_detail_price']));
        $pesanan[$i]['transaction_detail_discount'] =addslashes(htmlentities($row['transaction_detail_discount']));

	    $i++;
	}
	echo json_encode(array('result' => 'Berhasil', 'data' => $pesanan));
}

else {
	echo json_encode(array('result' => 'Gagal', 'sql' =>$sql));
  die();
}
  	$stmt->close();
$mysqli->close();
?>
