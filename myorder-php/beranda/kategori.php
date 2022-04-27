<?php
  include "../connect.php";

  $sql = "SELECT * FROM category ORDER by category_name ASC";
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$kategori = array();
    $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $kategori[$i]['category_id'] = addslashes(htmlentities($row['category_id']));
	    $kategori[$i]['category_name'] = addslashes(htmlentities($row['category_name']));	  
	    $i++;
	}
	echo json_encode($kategori);
} 

else {
echo "Unable to process you request, please try again";
  die();
}
  	$stmt->close();
    $mysqli->close();
?>
