<?php
  include "../connect.php";

  $transaction_id =  $_POST['transaction_id'];

  $sql = "SELECT `transaction_delivery_status` FROM `transaction` WHERE `transaction_id` = ?";
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('i', $transaction_id);
  $stmt->execute();
  $result = $stmt->get_result(); 

  $status = "";
  if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        $status = addslashes(htmlentities($row['transaction_delivery_status']));
      }
  }

  if($status == null)
  {
    $sql = "UPDATE transaction SET transaction_status='Sedang Dikirim', transaction_delivery_status='On The Way' WHERE transaction_id = ?";  
  }
  
  else if($status == "On The Way")
  {
    $sql = "UPDATE transaction SET transaction_delivery_status='Arrived' WHERE transaction_id = ?";  
  }
  
  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('i', $transaction_id);
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