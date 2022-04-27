<?php
  include "../connect.php";

  $transaction_id =  $_POST['transaction_id'];
  $driver_id = $_POST['driver_id'];
  $kasir_id = $_POST['kasir_id'];  
  $pembayaran_id = $_POST['pembayaran_id'];

  $sql = "UPDATE transaction SET transaction_status='Sedang Diproses', payment_id = ? ,cashier_id= ?, driver_id= ? WHERE transaction_id = ?";  

  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('iiii', $pembayaran_id , $kasir_id , $driver_id, $transaction_id);
  $stmt->execute();

  if ($stmt->affected_rows > 0) {
    $arr_hasil = array("status"=>true,"data"=> "Berhasil Mengirimkan Ke ");
    echo json_encode($arr_hasil);    
  } 
  else 
  {
    $arr_hasil = array("status"=>false,"data"=>$transaction_id . " " . $driver_id . " " . $kasir_id);
           echo json_encode($arr_hasil);
        die();
  }
$stmt->close();
$mysqli->close();
?>