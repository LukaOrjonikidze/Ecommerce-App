<?php



class Database implements IDatabase {
    private $host;
    private $user;
    private $password;
    private $db_name;
    private $conn;

    public function __construct($host, $user, $password, $db_name) {
        $this->host = $host;
        $this->user = $user;
        $this->password = $password;
        $this->db_name = $db_name;
    }
    public function connect(){
        $this->conn = mysqli_connect($this->host, $this->user, $this->password, $this->db_name);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
    public function selectAll(){
        $sql = "SELECT * FROM products ORDER BY SKU";
        $result = $this->conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);

    }
    public function delete($skus) {
        try {
            foreach ($skus as $sku) {
                $sql = "DELETE FROM products WHERE SKU like '$sku'";
                $this->conn->query($sql);
            }
            return "Success";
        } catch (\Throwable $th) {
            return $th;
        }
        
    }
    public function insert($sku, $name, $price, $type, $value){
        $sql = "SELECT sku FROM products WHERE sku like '$sku'";
        $result = mysqli_query($this->conn, $sql);
        if (count(mysqli_fetch_all($result, MYSQLI_ASSOC)) > 0){
            return "Product with the Given SKU already exists!";
        }
        try {
            $sql = "INSERT INTO products (SKU, Name, Price, Type, Value) VALUES ('$sku', '$name', '$price', '$type', '$value')";
            $this->conn->query($sql);
            return "Success";
        } catch (\Throwable $th) {
            return $th;
        }
    }
}





?>