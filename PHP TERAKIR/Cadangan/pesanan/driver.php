<?php
  include "../connect.php";

  $cabang = $_POST['cabang'];
  $sql = "SELECT * from user where user_role = 'Driver' AND user_Delete = 0 AND store_id=".$cabang;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$pesanan = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
        $pesanan[$i]['user_id'] = addslashes(htmlentities($row['user_id']));      
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
