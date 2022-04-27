<?php
  include "../connect.php";
  
  $id = $_POST['user_id'];
  
  $sql = "SELECT * from user where user_id=" . $id;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$user = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
  	    $user[$i]['user_phone'] = addslashes(htmlentities($row['user_phone']));
        $user[$i]['user_name'] = addslashes(htmlentities($row['user_name']));

	    $i++;
	}
	echo json_encode(array('result' => 'Berhasil', 'data' => $user));
}

else {
	echo json_encode(array('result' => 'Gagal'));
  die();
}
  	$stmt->close();
$mysqli->close();
?>
