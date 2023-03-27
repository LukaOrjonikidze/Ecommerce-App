<?php

class Router implements IRouter{
    private $routes = [];
    public function addRoute($method, $path, $callback) {
        $this->routes[$method][$path] = $callback;
    }
    public function route($method, $path) {
        if (isset($this->routes[$method][$path])) {
            return $this->routes[$method][$path]();
        }
        http_response_code(405);
    }
}