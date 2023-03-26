<?php


class DVD extends Product {
    private $weight;

    public function __construct($sku, $name, $price, $type, $weight) {
        parent::__construct($sku, $name, $price, $type);
        $this->weight = $weight;
        $this->value = "$weight";
    }
}