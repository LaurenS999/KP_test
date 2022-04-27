<?php
  include "../connect.php";

  $id = $_POST['menu_id'];
  
  
  $sql = "SELECT * FROM menu WHere menu_delete = 0 AND menu_id = " . $id;
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
      $menulist[$i]['menu_description'] = addslashes(htmlentities($row['menu_desc']));
      $menulist[$i]['menu_discount'] = addslashes(htmlentities($row['menu_discount']));        
      $menulist[$i]['menu_stok'] = addslashes(htmlentities($row['menu_stok']));
      $menulist[$i]['category_id'] = addslashes(htmlentities($row['category_id']));   
      $menulist[$i]['store_id'] = addslashes(htmlentities($row['store_id']));
      // $menulist[$i]['jumlah'] = $jumlah;
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
