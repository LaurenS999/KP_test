<?php
  include "../connect.php";

  $sql = "SELECT * FROM banner WHere banner_delete = 0";
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
  $kategori = array();
    $i = 0;

    while ($row = $result->fetch_assoc()) {
      $kategori[$i]['banner_id'] = addslashes(htmlentities($row['banner_id']));
      $kategori[$i]['banner_name'] = addslashes(htmlentities($row['banner_name']));   
      $kategori[$i]['banner_date_edited'] = addslashes(htmlentities($row['banner_date_edited']));   
      $i++;
  }
  echo json_encode($kategori);
} 

else {
echo "Gagal Menemukan Category";
  die();
}
    $stmt->close();
    $mysqli->close();
?>
