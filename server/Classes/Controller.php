<?php 
Class Controller implements IController {
    public function get($db) {
        $result = $db->selectAll();
        return $result;
    }
    public function post($body, $db) { 
            $products = [
                "DVD" => new DVD($body->sku, $body->name, $body->price, $body->type, $body->size),
                "Book" => new Book($body->sku, $body->name, $body->price, $body->type, $body->weight),
                "Furniture" => new Furniture($body->sku, $body->name, $body->price, $body->type, $body->height, $body->width, $body->length)
            ];
            $product = $products[$body->type];
            $result = $product->save($db);
            return $result;
    }
    public function delete($body, $db) {
        $skus = $body;
        $result = $db->delete($skus);
        return $result;
    }
}