<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$id = file_get_contents('php://input');

try {
    $sql = "SELECT * FROM room WHERE id = '".$id."'";
    $result = $condb->query($sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $response['id'] = $row['id'];
        $response['name_room'] = $row['name_room'];
        $response['number'] = $row['number'];
        $response['status'] = '200';
    } else {
        $response['status'] = '404';
    }

    echo json_encode($response);
} catch (PDOException $e) {
    echo $e->getMessage();
}
