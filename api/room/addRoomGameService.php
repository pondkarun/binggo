<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id_room = @$postRequest->id_room;
$number = @$postRequest->number;
$resultObj = new \stdClass();

if ($id_room && $number) {
    $sql = "SELECT COUNT(id) AS COUNT_Game FROM `room_game` WHERE id_room = '".$id_room."'";
    $result = mysqli_query($condb, $sql) or die("Error in query: $sql ".mysqli_error());
    $row = mysqli_fetch_array($result);
    $COUNT_Game = $row['COUNT_Game'] + 1;
    $game = 'Game'.$COUNT_Game;

    // INSERT
    $sql = "INSERT INTO room_game ( `id_room` , `game` , `number`) VALUES ( '".$id_room."' , '".$game."' , '".$number."')";
    $result = mysqli_query($condb, $sql);

    // UPDATE
    $status = 'false';
    $sql = "UPDATE player_acc_room SET status = '".$status."' WHERE id_room = '".$id_room."'  ";
    $result = mysqli_query($condb, $sql);

    $resultObj->status = '200';
    print_r(json_encode($resultObj));
} else {
    $$resultObj->status = '500';
    print_r($status);
}
