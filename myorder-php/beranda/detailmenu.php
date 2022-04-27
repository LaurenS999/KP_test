<?php
  include "../connect.php";

  $id = $_POST['menu_id'];
  
  // $categori_id = "8";
  $sql = "SELECT * from menu where menu_id= ". $id;
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
      	$menulist[$i]['menu_stok'] = addslashes(htmlentities($row['menu_stok']));
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
