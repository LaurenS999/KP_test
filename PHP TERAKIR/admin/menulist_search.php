<?php
  include "../connect.php";

  $storeid= $_POST['storeid'];
  //$storeid =1;
  $nama = $_POST['menunama'];
  if($storeid == "semuaresto")
  {
    $sql = "SELECT * FROM menu WHere menu_delete = 0 AND menu_name LIKE '%" . $nama ."%'";
  }
  else
  {
    $sql = "SELECT * FROM menu WHere menu_delete = 0 AND store_id=" . $storeid . " AND menu_name LIKE '%" . $nama ."%'";      
  }
  $stmt = $mysqli->prepare($sql);  
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$menu = array();
    $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $menu[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
      $menu[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));   
      $menu[$i]['menu_description'] = addslashes(htmlentities($row['menu_desc']));
      $menu[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));
      $menu[$i]['menu_img_ext'] = addslashes(htmlentities($row['menu_img_ext']));      
	    $i++;
  	}
  	echo json_encode($menu);
  } 

  else 
  {
    echo "Gagal Menemukan Menu";
    die();
  }
	$stmt->close();
  $mysqli->close();
?>
