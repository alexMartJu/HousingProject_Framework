<?php
    class search_model {

        private $bll;
        static $_instance;
        
        function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a search_model --> getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_search_type() {
            return 'Entro a search_model --> get_search_type'; 
        }
    }
?>