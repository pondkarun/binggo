<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id_room = @$postRequest->id_room;
$id_player = @$postRequest->id_player;

try {
    $sql = "SELECT * FROM player_acc_room WHERE id_room = '".$id_room."' AND id_player = '".$id_player."'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['id'] = $row['id'];
        $response['id_room'] = $row['id_room'];
        $response['id_player'] = $row['id_player'];
        $response['status'] = $row['status'];
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {
    echo $e->getMessage();
}
