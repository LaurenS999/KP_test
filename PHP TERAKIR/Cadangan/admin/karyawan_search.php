<?php
  include "../connect.php";
  
  // $store_id = $_POST['store_id'];  
  //$nama = $_POST['username'];
  $nama = "ud";
  if($store_id== "semuacabang")
  {
    $sql = "SELECT * from users u inner join store s on u.store_id=s.store_id where u.user_name LIKE '%". $nama . "%' ";
  }
  else
  {
    $store_id = 1;
    $sql = "SELECT * from users u inner join store s on u.store_id=s.store_id where u.store_id = ". $store_id ." AND u.user_name LIKE '%". $nama . "%' ";
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
