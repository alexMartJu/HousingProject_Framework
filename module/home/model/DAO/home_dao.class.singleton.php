<?php
    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a home_dao --> getInstance';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_automation($db) {
            // return 'Entro a home_dao --> select_automation';
            $sql = "SELECT * FROM `automation_parts` ORDER BY name_aut_parts ASC LIMIT 30;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_type($db) {
            // return 'Entro a home_dao --> select_type';
            $sql = "SELECT * FROM `h_type` ORDER BY name_type ASC LIMIT 30;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_categories($db) {
            // return 'Entro a home_dao --> select_categories';
            $sql = "SELECT * FROM category ORDER BY id_category ASC";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_operation($db) {
            // return 'Entro a home_dao --> select_operation';
            $sql = "SELECT * FROM operation ORDER BY id_operation LIMIT 4";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_city($db) {
            // return 'Entro a home_dao --> select_city';
            $sql = "SELECT * FROM city ORDER BY id_city ASC";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_recommendations($db) {
            // return 'Entro a home_dao --> select_recommendations';
            $sql = "SELECT * FROM city ORDER BY id_city DESC LIMIT 4";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_mostVisited($db) {
            // return 'Entro a home_dao --> select_mostVisited';
            $sql = "SELECT h.*, c.*
            FROM housings h JOIN city c ON h.id_city = c.id_city
            ORDER BY h.visit_count DESC LIMIT 4";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }
?>