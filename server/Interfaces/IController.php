<?php 

interface IController {
    public function get($db);
    public function post($body, $db);
    public function delete($body, $db);
}
