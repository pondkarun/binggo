<?php

require_once '../condb.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents('php://input');
$postRequest = json_decode($input);

$id_par = @$postRequest->id_par;
$number = @$postRequest->number;

if($id_par){
    $number = json_encode($number);
    $sql = "INSERT INTO table_number
         (
             `id_par`,
             `number`
         )
          VALUES
          (
             '".$id_par."',
             '".$number."'
         )";
    $result = mysqli_query($condb, $sql) or die("Error in query: $sql".mysqli_error());
}

 $resultObj = new \stdClass();
 $resultObj->id_par = $id_par;
 $resultObj->number = $number;
 print_r(json_encode($resultObj));
