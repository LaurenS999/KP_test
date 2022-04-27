<?php
  include "../connect.php";

  $categori_id = $_POST['kategori_id'];
  $cabang = $_POST['store_id'];

  if($cabang == "semuaresto" || $cabang == 0)
  {
    $sql = "SELECT * FROM menu m INNER JOIN store s on m.store_id=s.store_id  WHERE category_id = ? AND menu_delete=0";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('i',$categori_id);
  } 
  else if($cabang > 0)
  {  
    $sql = "SELECT * FROM menu m INNER JOIN store s on s.store_id=m.store_id WHERE m.category_id = ? AND m.menu_delete=0 AND m.store_id = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ii',$categori_id, $cabang);
  }
  
  $stmt->execute();
  $res = $stmt->get_result();

  if ($res->num_rows > 0) {
	$kategoridetaillist = array();
  $i = 0;
    while ($row = $res->fetch_assoc()) {
	    $kategoridetaillist[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
	    $kategoridetaillist[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));
      $kategoridetaillist[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));
      $kategoridetaillist[$i]['menu_description'] = addslashes(htmlentities($row['menu_desc']));
      $kategoridetaillist[$i]['menu_stok'] = addslashes(htmlentities($row['menu_stok']));
      $kategoridetaillist[$i]['menu_img_ext'] = addslashes(htmlentities($row['menu_img_ext']));      
      $kategoridetaillist[$i]['store_name'] = addslashes(htmlentities($row['store_name']));
	    $i++;
	}
	echo json_encode([
            'status' => true,
            'data' => $kategoridetaillist
        ]);
}

else {
echo json_encode([
            'status' => false,
            'data' => 'Terjadi kesalahan, silahkan coba lagi nanti',
            'sql' => $sql
        ]);
        die();
}
  	$stmt->close();
  $mysqli->close();
?>
