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
    $sql = "SELECT count(transaction_id) as 'jumlahpesanan',SUM(transaction_total_amount) AS 'SubTotal', SUM(transaction_total_discount) AS 'TotalDiskon' FROM transaction WHERE transaction_status='Selesai'  AND transaction_delete = 0 AND transaction_date BETWEEN '". $tanggalawal ."' AND '". $tanggalakhir ."'";
  }
  else
  {
    $sql = "SELECT count(transaction_id) as 'jumlahpesanan', SUM(transaction_total_amount) AS 'SubTotal', SUM(transaction_total_discount) AS 'TotalDiskon' FROM transaction WHERE store_id= " . $store_id . " AND transaction_status='Selesai' AND transaction_delete = 0 AND transaction_date BETWEEN '". $tanggalawal ."' AND '". $tanggalakhir ."'";
  }
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) 
  {
  	$laporan = array();
    $i = 0;
      while ($row = $result->fetch_assoc()) {
        $laporan[$i]['jumlahpesanan'] = addslashes(htmlentities($row['jumlahpesanan']));
  	    $laporan[$i]['SubTotal'] = addslashes(htmlentities($row['SubTotal']));
  	    $laporan[$i]['TotalDiskon'] = addslashes(htmlentities($row['TotalDiskon']));     
  		$i++;
  	}
  	echo json_encode(array('result' => 'Berhasil', 'data' => $laporan));
  }

  else {
	  echo json_encode(array('result' => 'Gagal', 'data'=>$sql));
    die();
  }
$stmt->close();
$mysqli->close();
?>
