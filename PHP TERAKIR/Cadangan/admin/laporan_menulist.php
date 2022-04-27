<?php
  include "../connect.php";
  
  $store_id = $_POST['storeid'];
  $tanggalawal = $_POST['tanggalawal'];
  $tanggalakhir = $_POST['tanggalakhir'];
  // $tanggalawal = '2020-01-03';
  // $tanggalakhir = '2020-10-19';
  // $store_id = 'semuaresto';

  if($store_id == "semuaresto")
  {
  $sql = "SELECT td.menu_id, m.menu_name ,SUM(transaction_detail_count) AS 'TotalCount', m.menu_sell_price 
          FROM transaction_detail td inner join menu m on m.menu_id=td.menu_id 
            inner join transaction t on t.transaction_id=td.transaction_id
          WHERE t.transaction_status='Selesai'  AND t.transaction_delete = 0 AND t.transaction_date between '". $tanggalawal . "' AND '". $tanggalakhir ."'
          GROUP BY td.menu_id ";
  }
  else
  {
    $sql = "SELECT td.menu_id, m.menu_name ,SUM(transaction_detail_count) AS 'TotalCount', m.menu_sell_price 
          FROM transaction_detail td inner join menu m on m.menu_id=td.menu_id 
            inner join transaction t on t.transaction_id=td.transaction_id
          WHERE t.transaction_status='Selesai' AND t.transaction_delete = 0 AND t.store_id=". $store_id ." AND t.transaction_date between '". $tanggalawal . "' AND '". $tanggalakhir ."'
          GROUP BY td.menu_id ";
  }
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) {
	$restodetail = array();
  $i = 0;

    while ($row = $result->fetch_assoc()) {
	    $restodetail[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
      $restodetail[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));      
	    $restodetail[$i]['TotalCount'] = addslashes(htmlentities($row['TotalCount']));
      $restodetail[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));      
      $i++;
	}
	echo json_encode(array('result' => 'Berhasil', 'data' => $restodetail));
}

else {
	echo json_encode(array('result' => 'Gagal' , 'data'=>$sql));
  die();
}
$stmt->close();
$mysqli->close();
?>
