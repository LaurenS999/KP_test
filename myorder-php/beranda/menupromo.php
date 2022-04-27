<?php
	include "../connect.php";
	
    $promoid = 12;
    $sql = "SELECT * FROM menu WHERE category_id = ?";

    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('i',$promoid);
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
    		"msg" => "Email dan/atau password Anda salah!"
    	]);
    }

	$stmt->close();
	$mysqli->close();
?>