<?php
  include "../connect.php";
  $role = $_POST['role'];
  
  $time = date("H:i:s");
  $date = date("Y-m-d");
  $ordernumber = 0;

  $sql = "SELECT MAX(`transaction_order_number`) AS 'ordernumber' FROM `transaction` WHERE `transaction_date` = '". $date ."'";

  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  if($result->num_rows > 0)
  {
      while ($row = $result->fetch_assoc()) 
      {
          $ordernumber = addslashes(htmlentities($row['ordernumber']));
      }
      $ordernumber++;
  }

  if($role == "Pelanggan")
  {
    $id = $_POST['uid'];
    $customer_name = $_POST['nama'];
    $total = $_POST['SubTotal'];
    $diskon = $_POST['diskon'];
    $catatan = $_POST['catatan'];
    $alamat = $_POST['alamat']; 

    $payment = $_POST['pembayaran'];    
    
    $distance = $_POST['jarak'];
    $distanceperKM = 2000;      
    $biayaantar = $_POST['biaya_antar'];

    $Latitude = $_POST['Latitude'];
    $Longitude = $_POST['Longtitude'];

    $bayar = NULL;
    $kembalian = NULL;
    
    $store_id = $_POST['store_id'];

    $sql = "INSERT INTO transaction (transaction_id, transaction_customer_name, transaction_status, transaction_delivery_status, transaction_total_amount, transaction_total_discount, transaction_distance, transaction_delivery_fee_per_km, transaction_delivery_fee_total, transaction_total_paid, transaction_total_change, transaction_order_number, transaction_date, transaction_time, transaction_message, transaction_address, transaction_latitude, transaction_longitude, transaction_delete, payment_id, store_id, customer_id, cashier_id, driver_id) VALUES (NULL, '". $customer_name ."', 'Menunggu Konfirmasi', NULL, '". $total ."', '". $diskon ."', '". $distance ."', '". $distanceperKM."', '". $biayaantar ."', '". $bayar ."', '". $kembalian ."', '". $ordernumber ."', '". $date ."', '". $time ."', '". $catatan ."', '". $alamat ."', ". $Latitude .", ". $Longitude .", 0, '". $payment ."', '". $store_id ."', '".  $id ."', NULL, NULL)" ;

  }
  else if ($role == "Kasir")
  {
    $id = $_POST['uid'];
    $customer_name = $_POST['nama'];
    $total = $_POST['SubTotal'];
    $diskon = $_POST['diskon'];
    $catatan = $_POST['catatan'];
    $alamat = null; 

    $payment = $_POST['pembayaran'];
    
    $distance = 0;
    $distanceperKM = 0;      
    $biayaantar = $distance * $distanceperKM;

    $langtitude = "0";
    $longtitude = "0";

    $bayar = $_POST['bayar'];
    $kembalian = $bayar - $total - $diskon;
    
    $store_id = $_POST['store_id'];

     $sql = "INSERT INTO `transaction` (`transaction_id`, `transaction_customer_name`, `transaction_status`, `transaction_delivery_status`, `transaction_total_amount`, `transaction_total_discount`, `transaction_distance`, `transaction_delivery_fee_per_km`, `transaction_delivery_fee_total`, `transaction_total_paid`, `transaction_total_change`, `transaction_order_number`, `transaction_date`, `transaction_time`, `transaction_message`, `transaction_address`, `transaction_latitude`, `transaction_longitude`, `transaction_delete`, `payment_id`, `store_id`, `customer_id`, `cashier_id`, `driver_id`) VALUES (NULL, '". $customer_name ."', 'Selesai', NULL, '". $total ."', '". $diskon ."', '". $distance ."', '". $distanceperKM."', '". $biayaantar ."', '". $bayar ."', '". $kembalian ."', '". $ordernumber ."', '". $date ."', '". $time ."', '". $catatan ."', '". $alamat ."', '". $langtitude ."', '". $longtitude ."', 0, ". $payment .", ". $store_id .", NULL, ". $id .", NULL)" ;
  }

  //MENU LIST
  $menu = $_POST['menu_id'];
  $jumlahPesanan = $_POST['jumlahPesanan'];

  //$distance = $_POST['jarak'];
  //$distanceperKM = 10000;    
  
  $stmt = $mysqli->prepare($sql);  
  $stmt->execute();

  if ($stmt->affected_rows > 0)
  {   
      //AMBUK ID TRANSACTION TERBARU
      $sql = "SELECT MAX(transaction_id) AS 'transaction_id' FROM transaction";      
      $stmt = $mysqli->prepare($sql);
      $stmt->execute();
      $result = $stmt->get_result(); 

      if($result->num_rows > 0)
      {
          while ($row = $result->fetch_assoc()) 
          {
              $newID = addslashes(htmlentities($row['transaction_id']));              
              
              for($i = 0; $i < count($menu); $i++)
              {
                  $sql = "SELECT menu_sell_price, menu_discount FROM menu where menu_id = " . $menu[$i];
                  $stmt = $mysqli->prepare($sql);
                  $stmt->execute();
                  $result = $stmt->get_result(); 
                  
                  if ($result->num_rows > 0)
                  {
                    while ($row = $result->fetch_assoc()) 
                    {
                        $menu_harga = addslashes(htmlentities($row['menu_sell_price']));
                        $menu_diskon = addslashes(htmlentities($row['menu_discount']));

                        $sql = "INSERT INTO `transaction_detail` (`transaction_detial_id`, `transaction_detail_count`, `transaction_detail_price`, `transaction_detail_discount`, `menu_id`, `transaction_id`) VALUES (NULL, '". $jumlahPesanan[$i] ."', '". $menu_harga ."', '". $menu_diskon ."', '". $menu[$i] ."', '". $newID ."')";
                        $stmt = $mysqli->prepare($sql);
                        $stmt->execute();

                        if ($stmt->affected_rows > 0)
                        {
                          $arr_hasil = array("status"=>true,"pesan"=>"Berhasil Mengganti Kategori!");                             
                        }
                    }                                                
                  }                                                        
              }
              //SINI
              echo json_encode($arr_hasil);  
          }                  
      }      
  } 
else {
  $arr_hasil = array("status"=>false,"pesan"=>"Gagal Menambah Transaksi!", "sql" => $sql);
         echo json_encode($arr_hasil);
      die();
}
$stmt->close();
$mysqli->close();
?>