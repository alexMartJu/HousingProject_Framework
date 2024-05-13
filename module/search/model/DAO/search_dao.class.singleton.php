<?php
    class search_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a search_dao --> getInstance';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function search_type($db) {
            // return 'Entro a search_dao --> search_type';
            $sql = "SELECT * 
            FROM h_type";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function search_category_null($db) {
            // return 'Entro a search_dao --> search_category_null';
            $sql = "SELECT DISTINCT *
            FROM category";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function search_category($db, $h_type) {
            // return 'Entro a search_dao --> search_category';
            $sql = "SELECT c.*
            FROM housings h
            JOIN housing_category hc ON h.id_housing = hc.id_housing
            JOIN category c ON hc.id_category = c.id_category
            JOIN h_type ht ON h.id_type = ht.id_type
            WHERE ht.name_type = '$h_type'
            GROUP BY c.id_category";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
    }
?>