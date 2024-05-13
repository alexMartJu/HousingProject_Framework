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
    }
?>