<?php


abstract class Product implements IProduct {
    protected $sku;
    protected $name;
    protected $price;
    protected $type;
    protected $value;

    public function __construct($sku, $name, $price, $type) {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->type = $type;
    }
    public function save(Database $db) {
        return $db->insert($this->sku, $this->name, $this->price, $this->type, $this->value);
    }

}






?>