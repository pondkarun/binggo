<?php

require_once '../condb.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$id_room = file_get_contents('php://input');

try {
    $data = array();
    $query = "SELECT 
    par.id,
    par.id_room,
    p.user
    FROM player_acc_room AS par 
    INNER JOIN player AS p ON par.id_player = p.id
    WHERE par.id_room = '".$id_room."' ";
    $result = $condb->query($query) or die($condb->error);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $e) {
    echo $e->getMessage();
}
