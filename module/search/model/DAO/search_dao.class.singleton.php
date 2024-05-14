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

        public function select_autocomplete($db, $complete, $h_type, $category) {
            // return 'Entro a search_dao --> select_autocomplete';
            if (!empty($h_type) && empty($category)){
                $sql="SELECT h.*,c.name_city
                FROM housings h
                JOIN city c ON h.id_city = c.id_city
                JOIN h_type ht ON h.id_type = ht.id_type
                WHERE ht.name_type = '$h_type' AND c.name_city LIKE '$complete%'";
            }else if(!empty($h_type) && !empty($category)){
                $sql="SELECT h.*,c.name_city
                FROM housings h
                INNER JOIN housing_category hc ON h.id_housing = hc.id_housing
                INNER JOIN category ca ON hc.id_category = ca.id_category
                INNER JOIN city c ON h.id_city = c.id_city
                INNER JOIN h_type ht ON h.id_type = ht.id_type
                WHERE ca.name_category = '$category' AND ht.name_type = '$h_type' AND c.name_city LIKE '$complete%'";
            }else if(empty($h_type) && !empty($category)){
                $sql="SELECT h.*,c.name_city
                FROM housings h
                INNER JOIN housing_category hc ON h.id_housing = hc.id_housing
                INNER JOIN category ca ON hc.id_category = ca.id_category
                INNER JOIN city c ON h.id_city = c.id_city
                WHERE ca.name_category = '$category' AND c.name_city LIKE '$complete%'";
            }else {
                $sql="SELECT h.*,c.name_city
                FROM housings h
                INNER JOIN city c ON h.id_city = c.id_city
                WHERE c.name_city LIKE '$complete%'";
            
            }

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }
    }
?>