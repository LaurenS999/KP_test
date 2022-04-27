<?php
  include "../connect.php";

  $uid =  $_POST['user_id'];
  $stok = $_POST['stokbaru'];

  if ($stok == 0)
  {
  	$sql = "UPDATE menu SET menu_stok= ?, menu_out_of_stok= 1 WHERE menu_id = ? ";
  }
  else
  {
  	$sql = "UPDATE menu SET menu_stok= ?, menu_out_of_stok= 0 WHERE menu_id = ? ";
  }

  $stmt = $mysqli->prepare($sql);
  $stmt->bind_param('ii', $stok, $uid);
  $stmt->execute();

  if ($stmt->affected_rows > 0) {
    $sql = "SELECT * FROM menu WHERE menu_id = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('i',$uid);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0) 
    {
      $kategoridetaillist = array();
      $i = 0;
        while ($row = $res->fetch_assoc()) {
          $kategoridetaillist[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
          $kategoridetaillist[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));
          $kategoridetaillist[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));
          $kategoridetaillist[$i]['menu_description'] = addslashes(htmlentities($row['menu_desc']));
          $kategoridetaillist[$i]['menu_stok'] = addslashes(htmlentities($row['menu_stok']));
          $i++;
      }
      $arr_hasil = array("status"=>true,"data"=> $kategoridetaillist);
      echo json_encode($arr_hasil);
    }

    else 
    {
      $arr_hasil = array("status"=>true,"data"=>"Berhasil Mengganti Stok!");
      echo json_encode($arr_hasil);
      die();
    }

     
  } 
  else {
    $arr_hasil = array("status"=>false,"data"=>"Gagal ganti Stok!");
           echo json_encode($arr_hasil);
        die();
  }
$stmt->close();
$mysqli->close();
?>