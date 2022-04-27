<?php
	$mysqli = new mysqli("localhost", "root", "", "myresto");
	if ($mysqli->connect_error) 
	{
		die("Connection failed: " . $mysqli->connect_error);
	}

	header("Access-Control-Allow-Origin: *");
    header("Cache-Control: no-cache");
	header("Access-Control-Expose-Headers", "Access-Control-*");
    header("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');

	date_default_timezone_set('Asia/Jakarta');
	
	$app_id = "4d107492-4ef7-48ea-94ac-3f72d20a0ba4";
	$rest_api_key = "MTIxY2E2YTEtZDdkYi00Njk2LWJkYzgtYTcxYzFjNmU0ZGFl";
?>