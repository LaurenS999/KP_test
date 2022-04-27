<?php
  include "../connect.php";

  //$jenispembayaran = $_POST['jenispembayaran'];
  $jenispembayaran = "o";
  $sql = "SELECT * from payment_type where payment_type_delete = 0 AND payment_type_name LIKE '%". $jenispembayaran ."%'";
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$paymenttype = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $paymenttype[$i]['payment_type_id'] = addslashes(htmlentities($row['payment_type_id']));
	    $paymenttype[$i]['payment_type_name'] = addslashes(htmlentities($row['payment_type_name']));    	
	    $i++;
	  }
	echo json_encode(array('result' => 'Berhasil', 'data' => $paymenttype));
  }

  else 
  {
  	echo json_encode(array('result' => 'Gagal'));
    die();
  }
$stmt->close();
$mysqli->close();
?>
