<?php
  include "../connect.php";

  $id = $_POST['uid'];
  //$id = 363;
  $sql = "SELECT * FROM menu WHere menu_delete = 0 AND menu_id = " . $id;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$Menu = array();
    $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $Menu[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
	    $Menu[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));	  
      $Menu[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));   
      $Menu[$i]['menu_discount'] = addslashes(htmlentities($row['menu_discount']));   
      $Menu[$i]['menu_desc'] = addslashes(htmlentities($row['menu_desc']));   
      $Menu[$i]['category_id'] = addslashes(htmlentities($row['category_id']));   
      $Menu[$i]['store_id'] = addslashes(htmlentities($row['store_id']));         
	    $i++;
	}
	echo json_encode($Menu);
} 

else {
echo "Gagal Menemukan Menu";
  die();
}
  	$stmt->close();
    $mysqli->close();
?>
