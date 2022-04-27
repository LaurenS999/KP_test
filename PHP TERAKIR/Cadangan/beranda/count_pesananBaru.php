<?php
  include "../connect.php";

  $store_id = $_POST['store_id'];
  //$store_id = 1;
  $sql = "SELECT * FROM transaction t inner join user u on t.customer_id=u.user_id WHERE transaction_status='Menunggu Konfirmasi'AND t.store_id = ".$store_id . " AND t.cashier_id is null ORDER BY t.transaction_date DESC, t.transaction_order_number DESC";

  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {	
    $count = 0;

    while ($row = $result->fetch_assoc()) {	    
	    $count++;
	}
  echo json_encode(array('result' => 'Berhasil', 'data' => $count));
	
} 

else {
  echo json_encode(array('result' => 'Gagal', 'data' => 0));
  die();
}
  	$stmt->close();
    $mysqli->close();
?>
