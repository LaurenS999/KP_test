<?php
include "../connect.php";
$statInit = $_POST['statInit'];

$sql = '';

if ($statInit == 'secondInit')
{
	$cabang = $_POST['cabang'];
	$sql = 'SELECT * FROM `store` WHERE store_delete=0 AND store_id='.$cabang;
}
else if ($statInit == 'firstInit')
{
	$sql = 'SELECT * FROM `store` WHERE store_delete=0 LIMIT 1';
}

$stmt = $mysqli->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0)
{
	$store = array();
	while ($row = $result->fetch_assoc()) 
	{
		$store['store_id'] = addslashes(htmlentities($row['store_id']));
		$store['store_name'] = addslashes(htmlentities($row['store_name']));
		$store['store_phone'] = addslashes(htmlentities($row['store_phone']));
		$store['store_address'] = addslashes(htmlentities($row['store_address']));
	}

	echo json_encode([
		'status' => true,
		'data' => $store
	]);
}
else
{
	echo json_encode([
		'status' => false,
		'data' => $sql
	]);
}

$stmt->close();
$mysqli->close();
?>