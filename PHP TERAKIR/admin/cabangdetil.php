<?php
  include "../connect.php";

  $id = $_POST['uid'];
  //$id = "1";
  $sql = "SELECT * from store where store_id = ". $id;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$restodetail = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $restodetail[$i]['store_id'] = addslashes(htmlentities($row['store_id']));
	    $restodetail[$i]['store_name'] = addslashes(htmlentities($row['store_name']));
      $restodetail[$i]['store_address'] = addslashes(htmlentities($row['store_address']));      
    	$restodetail[$i]['store_phone'] = addslashes(htmlentities($row['store_phone']));      
	    $i++;
	}
	echo json_encode(array('result' => 'Berhasil', 'data' => $restodetail));
}

else {
	echo json_encode(array('result' => 'Gagal'));
  die();
}
$stmt->close();
$mysqli->close();
?>
