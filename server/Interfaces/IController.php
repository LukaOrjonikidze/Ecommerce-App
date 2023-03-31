<?php 

interface IController {
    public function get(Database $db);
    public function post($body, Database $db);
    public function delete($body, Database $db);
}
