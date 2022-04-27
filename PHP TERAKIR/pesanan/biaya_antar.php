<?php 
    include "../connect.php";	
	
    $store_id = $_POST['store_id'];    
    $store_latitude = 0;
    $store_longitude = 0;
    
    $sql = "SELECT * FROM store WHERE store_id = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param('i' ,$store_id);
    $stmt->execute();
    $result = $stmt->get_result(); 
		
	if ($result->num_rows > 0) {
		while ($obj = $result->fetch_assoc()) {
			$store_latitude = addslashes(htmlentities($obj['store_latitude']));
			$store_longitude = addslashes(htmlentities($obj['store_longitude']));
	    }
	}
        
    $transaction_latitude = $_POST['latitude'];   
    $transaction_longitude = $_POST['longtitude'];
    $transaction_distance = 0;
    $transaction_delivery_fee_per_km = 3000;
    $transaction_delivery_fee = 0;
    
    $theta = $store_longitude - $transaction_longitude;
    $dist = sin(deg2rad($store_latitude)) * sin(deg2rad($transaction_latitude)) + cos(deg2rad($store_latitude)) * cos(deg2rad($transaction_latitude)) * cos(deg2rad($theta));
    $dist = acos($dist);
    $dist = rad2deg($dist);
    $miles = $dist * 60 * 1.1515;

    $transaction_distance = round($miles * 1.609344);
    if($transaction_distance == 1) {
        $transaction_delivery_fee = $transaction_delivery_fee_per_km;
    } else {
        $transaction_delivery_fee = $transaction_distance * $transaction_delivery_fee_per_km;
    }

	echo json_encode([
		'status' => true,
		'transaction_distance' => $transaction_distance . ' KM',
		'transaction_delivery_fee' => $transaction_delivery_fee
	]);

	$mysqli->close();
?>