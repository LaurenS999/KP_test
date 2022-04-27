<?php
  include "../connect.php";  
  
  $transaksiid = $_POST['transaksiid'];
  $menuid= $_POST['menuid'];
  $jumlah = $_POST['jumlah'];

  if($jumlah == 0)
  {
    $sql = "DELETE FROM `transaction_detail` WHERE menu_id= ? AND transaction_id =?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('ii', $menuid, $transaksiid);
    $stmt->execute();
  }
  else
  {
    $sql = "UPDATE transaction_detail SET transaction_detail_count = ? WHERE menu_id= ? AND transaction_id =?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('iii', $jumlah, $menuid, $transaksiid);
    $stmt->execute();
  }
    
  if ($stmt->affected_rows > 0) {
  //UPDATE TOTAL DI TRANSAKSI
      $sql= "SELECT * from transaction_detail WHERE transaction_id = " . $transaksiid;
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 

      if ($result->num_rows > 0) {        
        $i = 0;

        $total = 0;
        $totalDiscount=0;

        while ($row = $result->fetch_assoc()) {
          $harga = addslashes(htmlentities($row['transaction_detail_price']));
          $count = addslashes(htmlentities($row['transaction_detail_count']));
          $discount = addslashes(htmlentities($row['transaction_detail_discount']));

          $total = $harga * $count +$total;
          $totalDiscount = $discount + $totalDiscount;
          $i++;
        }
      }
      
      $sql= "UPDATE transaction SET transaction_total_amount = ". $total.", transaction_total_discount = ". $totalDiscount ." WHERE transaction_id =". $transaksiid;
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 

      if ($stmt->affected_rows > 0) {
        $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Mengubah Menu!");
           echo json_encode($arr_hasil);
      }
      else
      {
        $arr_hasil = array("status"=>false,"pesan"=>$transaksiid, "test" =>$menuid, "test2" =>$jumlah);
           echo json_encode($arr_hasil);
        die();
      }  
  } 
  else {
    $arr_hasil = array("status"=>false,"pesan"=>$transaksiid, "test" =>$menuid, "test2" =>$jumlah);
           echo json_encode($arr_hasil);
        die();
  }
  
  
$stmt->close();
$mysqli->close();
?>