<?php
  include "../connect.php";

  $sql = "SELECT * FROM category WHere category_delete = 0 ORDER by category_name ASC";
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  $kategori = array();
  
  if ($result->num_rows > 0) {
	
    $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $kategori[$i]['category_id'] = addslashes(htmlentities($row['category_id']));
      $kategori[$i]['category_name'] = addslashes(htmlentities($row['category_name']));   
	    $kategori[$i]['category_img_ext'] = addslashes(htmlentities($row['category_img_ext']));	  
	    $i++;
	}
	echo json_encode($kategori);
} 

else {
echo json_encode($kategori);
  die();
}
  	$stmt->close();
    $mysqli->close();
?>
