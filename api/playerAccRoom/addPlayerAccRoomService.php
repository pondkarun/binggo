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
    //DELETE table_number
    $sql = "SELECT tn.id_par FROM table_number AS tn 
    INNER JOIN player_acc_room AS par ON tn.id_par = par.id
    WHERE par.id_player = '".$id_player."' ";
    $result = $condb->query($sql);
    $row = mysqli_fetch_array($result);
    @$id_par = $row['id_par'];
    $sql = "DELETE FROM `table_number` WHERE id_par  = '".$id_par."'";
    $result = mysqli_query($condb, $sql);

    //DELETE player_acc_room
    $sql = "DELETE FROM `player_acc_room` WHERE id_player = '".$id_player."'";
    $result = mysqli_query($condb, $sql);
    // INSERT
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
