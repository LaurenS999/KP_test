<?php
  include "../connect.php";

  //$categori_id = $_POST['kategori_id'];
  $categori_id = "8";
  $sql = "SELECT * FROM `menu` WHERE category_id =" . $categori_id;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$kategoridetaillist = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $kategoridetaillist[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
	    $kategoridetaillist[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));
      $kategoridetaillist[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));
      $kategoridetaillist[$i]['menu_description'] = addslashes(htmlentities($row['menu_description']));
	    $i++;
	}
	echo json_encode($kategoridetaillist);
}

else {
echo "Unable to process you request, please try again";
  die();
}
  	$stmt->close();
$mysqli->close();
?>
