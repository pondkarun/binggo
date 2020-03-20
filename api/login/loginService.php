<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$user = @$postRequest->user;

if ($user) {
    $sql = "INSERT INTO player  ( `user` ) VALUES ( '".$user."')";
    $result = mysqli_query($condb, $sql);
    $status = '200';
    print_r($status);
} else {
    $status = '500';
    print_r($status);
}
