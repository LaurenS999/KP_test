<?php
  include "../connect.php";

  $nama = $_POST['menu_name'];
  $cabang = $_POST['store_id'];
  if($cabang == "semuaresto")
  {
    $sql = "SELECT * from menu where menu_delete=0 AND menu_name LIKE '%" .$nama."%'";    
  }
  else
  {
    $sql = "SELECT * from menu where store_id= ".$cabang." AND menu_delete=0 AND menu_name LIKE '%" .$nama."%'";
  }
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) 
  {
  	$menulist = array();
    $i = 0;

      while ($row = $result->fetch_assoc()) {
  	    $menulist[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
  	    $menulist[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));
        $menulist[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));
        $menulist[$i]['menu_discount'] = addslashes(htmlentities($row['menu_discount']));
        $menulist[$i]['menu_desc'] = addslashes(htmlentities($row['menu_desc']));
        $menulist[$i]['menu_stok'] = addslashes(htmlentities($row['menu_stok']));
        $menulist[$i]['menu_img_ext'] = addslashes(htmlentities($row['menu_img_ext']));        
  	    $i++;
	     }
	echo json_encode(array('result' => 'Berhasil', 'data' => $menulist, 'sql'=> $sql));

  }

else 
{
  echo json_encode(array('result' => 'Gagal', 'data' => 'Menu tidak ada!'));

  die();
}
  	$stmt->close();
    $mysqli->close();
?>
