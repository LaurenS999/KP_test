<?php
  include "../connect.php";
  
  $store_id = $_POST['storeid'];  
  //$store_id = 1;

  if($store_id == "semuaresto")
  {
  	$sql = "SELECT * from user u inner join store s on u.store_id=s.store_id Where u.user_delete = 0";
  }
  else
  {
  	$sql = "SELECT * from user u inner join store s on u.store_id=s.store_id where u.user_delete = 0 AND u.store_id = ". $store_id;
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
	echo json_encode(array('result' => 'Gagal'));
  die();
}
$stmt->close();
$mysqli->close();
?>
