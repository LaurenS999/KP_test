<?php
  include "../connect.php";

  $categori_id = $_POST['kategori_id'];  
  $sql = "SELECT * FROM menu WHERE category_id = ? AND menu_delete=0";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('i',$categori_id);
  $stmt->execute();
  $res = $stmt->get_result();

  if ($res->num_rows > 0) {
	$kategoridetaillist = array();
  $i = 0;
    while ($row = $res->fetch_assoc()) {
	    $kategoridetaillist[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
	    $kategoridetaillist[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));
      $kategoridetaillist[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));
      $kategoridetaillist[$i]['menu_description'] = addslashes(htmlentities($row['menu_description']));
      $kategoridetaillist[$i]['menu_stok'] = addslashes(htmlentities($row['menu_stok']));
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
