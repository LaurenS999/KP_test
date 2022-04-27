<?php
  include "../connect.php";

  $categori_id = $_POST['kategori_id'];
  $cabang = $_POST['cabang'];
  //$categori_id = "8";
  $sql = "SELECT * FROM `menu` WHERE menu_out_of_stok = 0 AND menu_delete=0 AND category_id =" . $categori_id. " AND store_id=" . $cabang;
  $stmt = $mysqli->prepare($sql);
  $stmt->execute();
  $result = $stmt->get_result(); 
  
  if ($result->num_rows > 0) 
    {
        $kategoridetaillist = array();
        $i = 0;

        while ($row = $result->fetch_assoc()) 
        {
            $kategoridetaillist[$i]['menu_id'] = addslashes(htmlentities($row['menu_id']));
            $kategoridetaillist[$i]['menu_name'] = addslashes(htmlentities($row['menu_name']));
            $kategoridetaillist[$i]['menu_desc'] = addslashes(htmlentities($row['menu_desc']));
            $kategoridetaillist[$i]['menu_sell_price'] = addslashes(htmlentities($row['menu_sell_price']));
            $kategoridetaillist[$i]['menu_discount'] = addslashes(htmlentities($row['menu_discount']));
            $kategoridetaillist[$i]['menu_stok'] = addslashes(htmlentities($row['menu_stok']));
            $kategoridetaillist[$i]['menu_img_ext'] = addslashes(htmlentities($row['menu_img_ext']));
            $kategoridetaillist[$i]['menu_out_of_stok'] = addslashes(htmlentities($row['menu_out_of_stok']));
            $kategoridetaillist[$i]['menu_delete'] = addslashes(htmlentities($row['menu_delete']));
            $kategoridetaillist[$i]['category_id'] = addslashes(htmlentities($row['category_id']));
            $kategoridetaillist[$i]['store_id'] = addslashes(htmlentities($row['store_id']));
            $i++;
        }

        echo json_encode([
            'status' => true,
            'data' => $kategoridetaillist
        ]);
    }

    else 
    {
        echo json_encode([
            'status' => false,
            'data' => 'Terjadi kesalahan, silahkan coba lagi nanti'
        ]);
        die();
    }

    $stmt->close();
    $mysqli->close();
?>
