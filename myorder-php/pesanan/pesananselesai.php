<?php
  include "../connect.php";

  $id = $_POST['uid'];
  
  $sql = "SELECT * from transaction where transaction_status='Paid' AND customer_id= ". $id;
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
      	$pesanan[$i]['driver_id'] = addslashes(htmlentities($row['driver_id']));
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
