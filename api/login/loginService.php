<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$user = @$postRequest->user;
$resultObj = new \stdClass();

if ($user) {
    $sql = "INSERT INTO player  ( `user` ) VALUES ( '".$user."')";
    $result = mysqli_query($condb, $sql);
    $last_id = mysqli_insert_id($condb); // คืนค่า id ที่ insert ล่าสุด
    $resultObj->status = '200';
    $resultObj->id_player = $last_id;
    print_r(json_encode($resultObj));
} else {
    $$resultObj->status = '500';
    $resultObj->id_player = null;
    print_r($status);
}
