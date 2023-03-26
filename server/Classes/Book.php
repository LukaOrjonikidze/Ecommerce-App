<?php



class Book extends Product {
    private $size;

    public function __construct($sku, $name, $price, $type, $size) {
        parent::__construct($sku, $name, $price, $type);
        $this->size = $size;
        $this->value = "$size";
    }
}