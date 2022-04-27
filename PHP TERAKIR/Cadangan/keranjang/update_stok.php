<?php
include "../connect.php";

$array_menu_pesan = $_POST['menu_id'];
$array_jumlah_pesan = $_POST['jumlah'];

// $array_menu_pesan = [1,2,3];
// $array_jumlah_pesan = [5,1,7];

$array_stok_menu = array();

for ($i=0; $i < count($array_menu_pesan); $i++) 
{ 
	$sql = "SELECT menu_stok FROM menu WHERE menu_id =" .$array_menu_pesan[$i];
	$stmt = $mysqli->prepare($sql);
	$stmt->execute();
	$result = $stmt->get_result();

	if ($result->num_rows > 0)
	{
		while ($row = $result->fetch_assoc()) 
		{
			$array_stok_menu[$i] = addslashes(htmlentities($row['menu_stok']));
		}
	}
}

for ($i=0; $i < count($array_menu_pesan); $i++) 
{ 
	$new_stok = $array_stok_menu[$i] - $array_jumlah_pesan[$i];

	if ($new_stok == 0)
	{
		$sql = "UPDATE menu SET menu_out_of_stok = 1, menu_stok = " .$new_stok. " WHERE menu_id = " .$array_menu_pesan[$i];
		$stmt = $mysqli->prepare($sql);
		$stmt->execute();
		$result = $stmt->get_result();
	}
	else
	{
		$sql = "UPDATE menu SET menu_stok = " .$new_stok. " WHERE menu_id = " .$array_menu_pesan[$i];
		$stmt = $mysqli->prepare($sql);
		$stmt->execute();
		$result = $stmt->get_result();
	}
}



$stmt->close();
$mysqli->close();
?>