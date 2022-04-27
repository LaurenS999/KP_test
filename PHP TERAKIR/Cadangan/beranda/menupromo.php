<?php
	include "../connect.php";
	
    $promoid = $_POST['cabang'];
    $sql = "SELECT * FROM menu m INNER JOIN category c on m.category_id=c.category_id
WHERE m.menu_delete=0 AND c.category_name LIKE '%promo%' AND m.store_id=".$promoid;

    $stmt = $mysqli->prepare($sql);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0)
    {
    	$menu = array();
        $i = 0;

    	while ($obj = $res->fetch_assoc()) {
    		$menu[$i]['menu_id'] = addslashes(htmlentities($obj['menu_id']));
			$menu[$i]['menu_name'] = addslashes(htmlentities($obj['menu_name']));
			$menu[$i]['menu_sell_price'] = addslashes(htmlentities($obj['menu_sell_price']));
            $menu[$i]['menu_discount'] = addslashes(htmlentities($obj['menu_discount']));
            $i++;
    	}

        echo json_encode([
        	"status" => true,
        	"data" => $menu
        ]);
    }
    else 
    {
    	echo json_encode([
    		"status" => false,
    		"data" => "Menu Promo Tidak Ada"
    	]);
    }

	$stmt->close();
	$mysqli->close();
?>