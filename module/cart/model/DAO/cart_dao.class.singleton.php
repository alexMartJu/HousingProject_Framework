<?php
    class cart_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a cart_dao --> getInstance';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_products_cart($db, $username, $id) {
            // return 'Entro a cart_dao --> select_products_cart';

            $sql = "SELECT * FROM cart 
            WHERE id_user = (SELECT id_user FROM users WHERE username = '$username') 
            AND id_housing = $id AND isActive = 0";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function insert_products_cart($db, $username, $id, $id_line) {
            // return 'Entro a cart_dao --> insert_products_cart';

            $sql = "INSERT INTO cart (id_line, id_product, id_user, id_housing, quantity, isActive)
            SELECT $id_line, hp.id_product, u.id_user, $id, 1, 0
            FROM housing_products hp
            JOIN users u ON u.username = '$username'
            JOIN products p ON hp.id_product = p.id_product
            WHERE hp.id_housing = $id AND p.stock > 0";

            return $stmt = $db->ejecutar($sql);
        }

        public function update_products_cart($db, $username, $id_housing, $id_product) {
            $sql = "UPDATE cart 
            SET quantity = quantity + 1
            WHERE id_user = (SELECT id_user FROM users WHERE username = '$username') 
            AND id_housing = $id_housing
            AND id_product = $id_product
            AND quantity < (SELECT p.stock FROM products p 
                            INNER JOIN housing_products hp ON p.id_product = hp.id_product 
                            WHERE hp.id_housing = $id_housing AND p.id_product = $id_product) AND isActive = 0";
            
            return $stmt = $db->ejecutar($sql);
        }


        public function get_new_id_line($db) {
            // return 'Entro a cart_dao --> get_new_id_line';

            $sql = "SELECT MAX(id_line) AS max_id_line FROM line_manager;";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function increment_max_id_line($db, $id_line) {
            // return 'Entro a cart_dao --> increment_max_id_line';

            $sql = "UPDATE line_manager SET id_line = $id_line";
            return $stmt = $db->ejecutar($sql);
        }

        public function count_cart_lines($db, $username) {
            $sql = "SELECT COUNT(DISTINCT id_line) AS count_lines 
            FROM cart 
            WHERE id_user = (SELECT id_user FROM users WHERE username = '$username') AND isActive=0";
            $stmt = $db->ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function getCartData($db, $username) {
            $sql = "SELECT c.id_line, c.id_product, c.id_user, c.id_housing, c.quantity, p.name_product, p.price_product, h.img_housing, p.stock
            FROM cart c JOIN housings h ON c.id_housing = h.id_housing JOIN users u ON c.id_user = u.id_user JOIN products p ON c.id_product = p.id_product 
            WHERE u.username = '$username' AND c.isActive=0;";

            $stmt = $db->ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function update_quantity_cart($db, $username, $id_product, $id_housing, $quantity) {
            $sql = "UPDATE cart AS c
            INNER JOIN users AS u ON c.id_user = u.id_user
            SET c.quantity = $quantity
            WHERE c.id_product = $id_product AND c.id_housing = $id_housing
            AND u.username = '$username'  AND c.isActive = 0";
            
            return $stmt = $db->ejecutar($sql);
        }

        public function delete_line_cart($db, $username, $id_line) {
            $sql = "DELETE c
            FROM cart c
            INNER JOIN users u ON c.id_user = u.id_user
            WHERE c.id_line = $id_line AND u.username = '$username' AND c.isActive = 0";
            
            return $stmt = $db->ejecutar($sql);
        }

        public function select_product_info($db, $id_housing) {
            $sql = "SELECT p.id_product, p.stock AS stock
            FROM products p 
            INNER JOIN housing_products hp ON p.id_product = hp.id_product 
            WHERE hp.id_housing = $id_housing";
            $stmt = $db->ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function remove_product_from_cart($db, $username, $id_line, $id_housing, $id_product) {
            $sql = "DELETE FROM cart 
                    WHERE id_user = (SELECT id_user FROM users WHERE username = '$username') 
                    AND id_line = $id_line
                    AND id_housing = $id_housing 
                    AND id_product = $id_product
                    AND isActive = 0";
            return $db->ejecutar($sql);
        }

        public function getCartDataByUsername($db, $username) {
            $sql = "SELECT ht.name_type AS housing_type, ci.name_city AS city_name, p.price_product, pr.name_product, ca.quantity 
            FROM cart ca 
            INNER JOIN housings h ON ca.id_housing = h.id_housing 
            INNER JOIN h_type ht ON h.id_type = ht.id_type 
            INNER JOIN city ci ON h.id_city = ci.id_city 
            INNER JOIN products p ON ca.id_product = p.id_product 
            INNER JOIN products pr ON ca.id_product = pr.id_product 
            WHERE ca.id_user = (SELECT id_user FROM users WHERE username = '$username') AND ca.isActive = 0;";
            
            $stmt = $db->ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function getCartSummary($db, $username) {
            $sql = "SELECT cart.id_product, 
            SUM(cart.quantity) AS total_quantity_in_cart,
            products.stock AS available_stock
            FROM cart
            JOIN products ON cart.id_product = products.id_product
            JOIN users ON cart.id_user = users.id_user
            WHERE cart.isActive = 0 AND users.username = '$username'
            GROUP BY cart.id_product;";
            
            $stmt = $db->ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function updateProductStock($db, $productId, $quantity) {
            $sql = "UPDATE products SET stock = stock - $quantity WHERE id_product = $productId";
            
            return $db->ejecutar($sql);
        }

        public function insertPurchase($db, $username, $name, $phone) {
            $sql = "INSERT INTO purchases (id_user, total_price, name, phone)
            SELECT users.id_user, SUM(products.price_product * cart.quantity), '$name', $phone
            FROM cart
            JOIN products ON cart.id_product = products.id_product
            JOIN users ON cart.id_user = users.id_user
            WHERE cart.isActive = 0 AND users.username = '$username'
            GROUP BY cart.id_user";
            $db->ejecutar($sql);
            return $db->lastInsertId();
        }

        public function insertPurchaseLines($db, $purchaseId, $username) {
            $sql = "INSERT INTO purchase_lines (purchase_id, id_line)
                    SELECT $purchaseId, cart.id_line
                    FROM cart
                    JOIN users ON cart.id_user = users.id_user
                    WHERE cart.isActive = 0 AND users.username = '$username'";
            return $db->ejecutar($sql);
        }

        public function updateCartStatus($db, $username) {
            $sql = "UPDATE cart
                    JOIN users ON cart.id_user = users.id_user
                    SET cart.isActive = 1
                    WHERE cart.isActive = 0 AND users.username = '$username'";
            return $db->ejecutar($sql);
        }

        public function getPurchaseDetails($db, $purchaseId, $username) {
            $sql = "SELECT purchases.purchase_id, purchases.total_price, purchases.name, purchases.phone, purchases.purchase_date, users.username 
                    FROM purchases
                    JOIN users ON purchases.id_user = users.id_user
                    WHERE purchases.purchase_id = $purchaseId AND users.username = '$username'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function getPurchaseLines($db, $purchaseId, $username) {
            $sql = "SELECT DISTINCT pl.id_line, c.id_product, p.name_product, c.quantity, p.price_product, ht.name_type, ci.name_city
            FROM purchase_lines pl
            JOIN cart c ON pl.id_line = c.id_line
            JOIN products p ON c.id_product = p.id_product
            JOIN housings h ON c.id_housing = h.id_housing
            JOIN h_type ht ON h.id_type = ht.id_type
            JOIN city ci ON h.id_city = ci.id_city
            JOIN purchases pu ON pl.purchase_id = pu.purchase_id
            JOIN users u ON pu.id_user = u.id_user
            WHERE pl.purchase_id = $purchaseId AND u.username = '$username'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
    }
?>