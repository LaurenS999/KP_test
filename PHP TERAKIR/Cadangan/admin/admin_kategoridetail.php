<?php
  include "../connect.php";

  $categori_id = $_POST['kategori_id'];
  //$categori_id = "8";
  $sql = "SELECT * FROM category WHERE category_id =" . $categori_id;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$kategoridetaillist = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $kategoridetaillist[$i]['category_id'] = addslashes(htmlentities($row['category_id']));
      $kategoridetaillist[$i]['category_name'] = addslashes(htmlentities($row['category_name']));  
	    $kategoridetaillist[$i]['category_img_ext'] = addslashes(htmlentities($row['category_img_ext']));  
	    $i++;
	}
	echo json_encode($kategoridetaillist);
}

else {
echo "Gagal Menemukan Detail Category";
  die();
}
  	$stmt->close();
$mysqli->close();
?>
