<?php
  include "../connect.php";

  $id = $_POST['driver_id'];
  
  $sql = "SELECT * from users where user_id=" . $id;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$pesanan = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
  	    $pesanan[$i]['user_name'] = addslashes(htmlentities($row['user_name']));
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
