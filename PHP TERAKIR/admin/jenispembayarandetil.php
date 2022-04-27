<?php
  include "../connect.php";

  $id = $_POST['uid'];

  $sql = "SELECT * from payment where payment_delete = 0 AND payment_id = " . $id;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$paymenttype = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $paymenttype[$i]['payment_type_id'] = addslashes(htmlentities($row['payment_id']));
	    $paymenttype[$i]['payment_type_name'] = addslashes(htmlentities($row['payment_name']));    	
	    $i++;
	}
	echo json_encode(array('result' => 'Berhasil', 'data' => $paymenttype));
}

else {
	echo json_encode(array('result' => 'Gagal'));
  die();
}
  	$stmt->close();
$mysqli->close();
?>
