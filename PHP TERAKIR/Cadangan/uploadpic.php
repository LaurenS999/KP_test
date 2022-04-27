<?php  
    header("Access-Control-Allow-Origin: *");
    
    $new_image_name = $_POST['halaman']. "_" . $_POST['id']."." . $_POST['ext'];
    //$new_image_name = "test".".jpg";    
    move_uploaded_file($_FILES["photo"]["tmp_name"], "images/".$new_image_name);
?>