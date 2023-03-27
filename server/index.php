<?php

require("autoload.php");


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

global $db, $controller, $body;

$db = new Database($host, $user, $password, $db_name);
$db->connect();


$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$request_body = file_get_contents('php://input');
$body = json_decode($request_body);

$controller = new Controller();


$router = new Router();
$router->addRoute('GET', '/products', function() {
    global $controller, $db;
    $result = $controller->get($db);
    echo json_encode($result);
});
$router->addRoute('POST', '/products', function() {
    global $controller, $body, $db;
    $result = $controller->post($body, $db);
    echo json_encode($result);
});
$router->addRoute('DELETE', '/products', function() {
    global $controller, $body, $db;
    $result = $controller->delete($body, $db);
    echo json_encode($result);
});
$router->route($method, $requestUri);

