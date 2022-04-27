<?php
  include "../connect.php";

  $nama = $_POST['menu_name'];
  $sql = "SELECT * from menu where menu_name LIKE '%" . $nama ."%'";

  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$menulist = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $menulist[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
	    $menulist[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));
      	$menulist[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));
      	$menulist[$i]['menu_description'] = addslashes(htmlentities($row['menu_description']));
	    $i++;
	}
	echo json_encode(array('result' => 'Berhasil', 'data' => $menulist));

}

else {
  echo json_encode(array('result' => 'Gagal'));

  die();
}
  	$stmt->close();
    $mysqli->close();
?>
