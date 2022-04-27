<?php
include "../connect.php";

$transaction_id =  $_POST['transaction_id'];
$payment_id = $_POST['pembayaran_id'];
$total_pembayaran = $_POST['total_pembayaran'];

$sql = "SELECT * from transaction WHERE transaction_id = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('i', $transaction_id);
$stmt->execute();
$res = $stmt->get_result();

$total_transaction = 0;
$total_delivery = 0;
if ($res->num_rows > 0) {
  while ($row = $res->fetch_assoc()) {
    $total_transaction = addslashes(htmlentities($row['transaction_total_amount']));
    $total_delivery = addslashes(htmlentities($row['transaction_delivery_fee_total']));
  }
}


$total_kembalian = $total_pembayaran - $total_transaction - $total_delivery;

$sql = "UPDATE transaction SET transaction_status='Selesai', transaction_total_paid = ?, transaction_total_change = ?  WHERE transaction_id = ?";


$stmt = $mysqli->prepare($sql);
$stmt->bind_param('iii', $total_pembayaran, $total_kembalian, $transaction_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
  $arr_hasil = array("status" => true, "data" => "Berhasil");
  echo json_encode($arr_hasil);
} else {
  $arr_hasil = array("status" => false, "data" => "Terjadi kesalahan, silahkan coba lagi nanti");
  echo json_encode($arr_hasil);
  die();
}
$stmt->close();
$mysqli->close();
