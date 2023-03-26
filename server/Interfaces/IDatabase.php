<?php

interface IDatabase {
    public function connect();
    public function selectAll();
    public function delete(array $skus);
    public function insert(string $sku, string $name, int $price, string $type, string $value);   
}


