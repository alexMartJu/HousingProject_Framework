<?php
    class search_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            // return 'Entro a search_model --> getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_search_type() {
            // return 'Entro a search_model --> get_search_type'; 
            return $this -> bll -> get_search_type_BLL();
        }

        public function get_search_category_null() {
            // return 'Entro a search_model --> get_search_category_null'; 
            return $this -> bll -> get_search_category_null_BLL();
        }

        public function get_search_category($args) {
            // return 'Entro a search_model --> get_search_category'; 
            return $this -> bll -> get_search_category_BLL($args);
        }

        public function get_autocomplete($args) {
            // return 'Entro a search_model --> get_autocomplete'; 
            return $this -> bll -> get_autocomplete_BLL($args);
        }
    }
?>