<?php
  include "../connect.php";

  //$id=36;
  $sql = "SELECT * FROM store Where store_delete =0";
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
  $pesanan = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
        $pesanan[$i]['store_id'] = addslashes(htmlentities($row['store_id']));
        $pesanan[$i]['store_name'] = addslashes(htmlentities($row['store_name']));
        $pesanan[$i]['store_address'] = addslashes(htmlentities($row['store_address']));
        $pesanan[$i]['store_phone'] = addslashes(htmlentities($row['store_phone']));
      $i++;
  }
  echo json_encode(array('result' => 'Berhasil', 'data' => $pesanan));
}

else {
  echo json_encode(array('result' => 'Gagal'));
  die();
}
    $stmt->close();
$mysqli->close();
?>
