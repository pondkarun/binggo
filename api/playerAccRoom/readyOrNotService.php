<?php

require_once '../condb.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id_room = @$postRequest->id_room;
$id_player = @$postRequest->id_player;
$status = $postRequest->status;

$sql = "UPDATE player_acc_room SET status = '".$status."' WHERE id_room = '".$id_room."' AND id_player = '".$id_player."' ";
$result = mysqli_query($condb, $sql) or die("Error in query: $sql".mysqli_error());
print_r($result);
