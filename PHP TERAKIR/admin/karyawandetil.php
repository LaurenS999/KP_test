<?php
include "../connect.php";

$id = $_POST['uid'];  

$sql = 'SELECT * from user u inner join store s where (u.user_id ='.$id.' AND u.user_delete = 0) And s.store_id = u.store_id';
$stmt = $mysqli->prepare($sql);
$stmt->execute();
$result = $stmt->get_result(); 

if ($result->num_rows > 0) 
{
    $karyawanDetil = array();
    $i = 0;

    while ($row = $result->fetch_assoc()) 
    {
        $karyawanDetil[$i]['user_id'] = addslashes(htmlentities($row['user_id']));
        $karyawanDetil[$i]['username'] = addslashes(htmlentities($row['uname']));
        $karyawanDetil[$i]['user_name'] = addslashes(htmlentities($row['user_name']));
        $karyawanDetil[$i]['user_phone'] = addslashes(htmlentities($row['user_phone']));
        $karyawanDetil[$i]['email'] = addslashes(htmlentities($row['email']));
        $karyawanDetil[$i]['password'] = addslashes(htmlentities($row['password']));
        $karyawanDetil[$i]['user_role'] = addslashes(htmlentities($row['user_role']));
        $karyawanDetil[$i]['store_id'] = addslashes(htmlentities($row['store_id']));
        $i++;
    }
    echo json_encode(array('result' => 'Berhasil', 'data' => $karyawanDetil));
}
else 
{
    echo json_encode(array('result' => $sql));
    die();
}

$stmt->close();
$mysqli->close();
?>
