<?php

require("autoload.php");
error_reporting(E_ALL & ~E_NOTICE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json");
header("HTTP/1.1 200 OK");

$host = "localhost";
$user = "root";
$password = "";
$db_name = "scandiweb";


$db = new Database($host, $user, $password, $db_name);
$db->connect();


$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$request_body = file_get_contents('php://input');
$body = json_decode($request_body);

$endpoints = explode('/', trim($requestUri, '/'));

if (count($endpoints) < 1 || $endpoints[0] !== 'products') {
    http_response_code(404);
    exit();
}

switch ($method) {
    case 'POST':
        $products = [
            "DVD" => new DVD($body->sku, $body->name, $body->price, $body->type, $body->size),
            "Book" => new Book($body->sku, $body->name, $body->price, $body->type, $body->weight),
            "Furniture" => new Furniture($body->sku, $body->name, $body->price, $body->type, $body->height, $body->width, $body->length)
        ];
        $product = $products[$body->type];
        $result = $product->save($db);
        echo json_encode($result);
        break;
    case 'DELETE':
        $skus = $body;
        $result = $db->delete($skus);
        echo json_encode($result);
        break;
    case 'GET':
        $result = $db->selectAll();
        echo json_encode($result);
        break;
    default:
        http_response_code(405);
}


