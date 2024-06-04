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
            AND id_housing = $id";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function insert_products_cart($db, $username, $id, $id_line) {
            // return 'Entro a cart_dao --> insert_products_cart';

            $sql = "INSERT INTO cart (id_line, id_product, id_user, id_housing, quantity)
            SELECT $id_line, hp.id_product, u.id_user, $id, 1
            FROM housing_products hp
            JOIN users u ON u.username = '$username'
            WHERE hp.id_housing = $id";

            return $stmt = $db->ejecutar($sql);
        }


        public function update_products_cart($db, $username, $id) {
            // return 'Entro a cart_dao --> update_products_cart';

            $sql = "UPDATE cart 
            SET quantity = quantity + 1
            WHERE id_user = (SELECT id_user FROM users WHERE username = '$username') 
            AND id_housing = $id";

            return $stmt = $db -> ejecutar($sql);
            
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
    }
?>