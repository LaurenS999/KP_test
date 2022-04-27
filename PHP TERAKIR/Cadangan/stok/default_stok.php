<?php
  include "../connect.php";
  
  $cabang = $_POST['store_id'];
  if($cabang == "semuaresto")
  {
    $sql = "SELECT * FROM category c inner join menu m on m.category_id=c.category_id WHERE c.category_delete = 0 AND m.menu_delete = 0 Limit 1";
    $stmt = $mysqli->prepare($sql);    
  } 
  else
  {  
    $sql = "SELECT * FROM category c inner join menu m on m.category_id=c.category_id WHERE c.category_delete = 0 AND m.menu_delete = 0 AND m.store_id = ? Limit 1";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('i', $cabang);
  }
  
  $stmt->execute();
  $res = $stmt->get_result();

  if ($res->num_rows > 0) 
  {
    $data = array();
    $i = 0;
    while ($row = $res->fetch_assoc()) {
	    $data[$i]['category_id'] = addslashes(htmlentities($row['category_id']));	    
	    $i++;
    }
  	echo json_encode([
            'status' => true,
            'data' => $data
    ]);
  }
  else 
  {
    echo json_encode([
            'status' => false,
            'data' => 'Terjadi kesalahan, silahkan coba lagi nanti'
    ]);
    die();
  }
	$stmt->close();
  $mysqli->close();
?>