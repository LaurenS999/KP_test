<?php
  include "../connect.php";  
  $id = $_POST['menu_id'];   
  $Menu = array();
  
  for($i = 0; $i < count($id); $i++)
  {
      $sql = "SELECT * FROM menu Where menu_delete = 0 AND menu_id = " . $id[$i];      
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 

      if($result->num_rows > 0)
      {
          while ($row = $result->fetch_assoc()) {
            $Menu[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
            $Menu[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));   
            $Menu[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));   
            $Menu[$i]['menu_discount'] = addslashes(htmlentities($row['menu_discount']));   
            $Menu[$i]['category_id'] = addslashes(htmlentities($row['category_id']));   
            $Menu[$i]['store_id'] = addslashes(htmlentities($row['store_id']));                  
          }
      }      
  }
  if(count($Menu) > 0)
  {      
      echo json_encode(array('result' => 'Berhasil', 'data' => $Menu));
  }
  else
  {
      echo json_encode(array('result' => 'Gagal', 'data' =>$Menu));
      die();
  }
  $stmt->close();
  $mysqli->close(); 
?>
