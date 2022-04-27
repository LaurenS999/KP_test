<?php
  include "../connect.php";

  $id = $_POST['uid'];
  $sql = "SELECT * FROM `banner` WHERE banner_delete =0 AND banner_id= ". $id;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$banner = array();
    $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $banner[$i]['banner_id'] = addslashes(htmlentities($row['banner_id']));
	    $banner[$i]['banner_name'] = addslashes(htmlentities($row['banner_name']));	  
      $banner[$i]['banner_date_edited'] = addslashes(htmlentities($row['banner_date_edited']));         
      $banner[$i]['banner_img_ext'] = addslashes(htmlentities($row['banner_img_ext']));               
      $banner[$i]['category_aim_id'] = addslashes(htmlentities($row['category_aim_id']));         
      $banner[$i]['menu_aim_id'] = addslashes(htmlentities($row['menu_aim_id']));               
      $banner[$i]['store_id'] = addslashes(htmlentities($row['store_id']));               
	    $i++;
	}
  $arr_hasil = array("status"=>true,"data"=>$banner);
	echo json_encode($arr_hasil);
} 

else {
  $arr_hasil = array("status"=>true,"data"=>"Berhasil Mengganti Menu!");
  echo json_encode($arr_hasil);  
  die();
}
  	$stmt->close();
    $mysqli->close();
?>
