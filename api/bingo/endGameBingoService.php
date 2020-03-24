<?php

require_once '../condb.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id_room = @$postRequest->id_room;
$id_par = @$postRequest->id_par;

$sql = "DELETE FROM `table_number` WHERE id_par =  '".$id_par."' ";
$result = mysqli_query($condb, $sql) or die("Error in query: $sql".mysqli_error());

print_r($sql);
$sql = "DELETE FROM `room_game` WHERE id_room =  '".$id_room."' ";
$result = mysqli_query($condb, $sql) or die("Error in query: $sql".mysqli_error());

$sql = "DELETE FROM `player_acc_room` WHERE id_room =  '".$id_room."' ";
$result = mysqli_query($condb, $sql) or die("Error in query: $sql".mysqli_error());
