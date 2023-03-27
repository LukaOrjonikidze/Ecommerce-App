<?php

interface IRouter {
    public function addRoute($method, $path, $callback);
    public function route($method, $path);
}