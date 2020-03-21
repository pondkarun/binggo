<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id_room = @$postRequest->id_room;
$id_player = @$postRequest->id_player;
$resultObj = new \stdClass();

if ($id_room && $id_player) {
    $sql = "INSERT INTO player_acc_room  ( `id_room` , `id_player`) VALUES ( '".$id_room."' , '".$id_player."')";
    $result = mysqli_query($condb, $sql);
    $last_id = mysqli_insert_id($condb); // คืนค่า id ที่ insert ล่าสุด
    $resultObj->status = '200';
    $resultObj->id = $last_id;
    $resultObj->id_room = $id_room;
    print_r(json_encode($resultObj));
} else {
    $$resultObj->status = '500';
    $resultObj->id_player = null;
    print_r($status);
}
