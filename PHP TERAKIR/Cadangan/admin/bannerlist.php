<?php
  include "../connect.php";

  $storeID = $_POST['store_id'];

  if($storeID == "semuaresto")
  {
      $sql = "SELECT * FROM `banner` WHERE banner_delete =0";
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result();
  }
  else
  {
      $sql = "SELECT * FROM `banner` WHERE banner_delete =0 AND store_id = ?";
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('i', $storeID);
      $stmt->execute();
      $result = $stmt->get_result(); 
  }
  
  
  if ($result->num_rows > 0) {
  $data = array();
    $i = 0;
    while ($row = $result->fetch_assoc()) {
      $data[$i]['banner_id'] = addslashes(htmlentities($row['banner_id']));
      $data[$i]['banner_name'] = addslashes(htmlentities($row['banner_name']));   
      $data[$i]['banner_date_edited'] = addslashes(htmlentities($row['banner_date_edited']));         
      $data[$i]['banner_img_ext'] = addslashes(htmlentities($row['banner_img_ext']));         
      $data[$i]['category_aim_id'] = addslashes(htmlentities($row['category_aim_id']));         
      $data[$i]['menu_aim_id'] = addslashes(htmlentities($row['menu_aim_id']));         
      $i++;
  }
  $arr_hasil = array("status"=>true,"data"=>$data);
  echo json_encode($arr_hasil);
} 

else {
  $arr_hasil = array("status"=>false,"data"=>"Gagal Mendapatkan Banner!");
  echo json_encode($arr_hasil);  
  die();
}
    $stmt->close();
    $mysqli->close();
?>