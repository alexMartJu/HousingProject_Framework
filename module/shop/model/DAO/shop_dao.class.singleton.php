<?php
    class shop_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a shop_dao --> getInstance';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_all_housings($db, $offset, $items_page) {

            $sql = "SELECT h.*, t.name_type, c.name_city, 
            (SELECT GROUP_CONCAT(i.img_housings SEPARATOR ';') FROM img_housings i WHERE i.id_housing = h.id_housing) AS img_housings, 
            (SELECT COUNT(*) FROM likes l WHERE l.id_housing = h.id_housing) AS likes_count
            FROM `housings` h
            INNER JOIN `h_type` t ON h.id_type = t.id_type
            INNER JOIN `operation` o ON h.id_operation = o.id_operation
            INNER JOIN `city` c ON h.id_city = c.id_city
            GROUP BY h.id_housing
            LIMIT $offset, $items_page";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar_array($stmt);
            
        }
    }
?>