<?php
    class home_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            
        }

        public static function getInstance() {
            // return 'Entro a home_model --> getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_Carrousel_Automation() {
            return 'Entro a home_model --> get_Carrousel_Automation'; 
        }

        public function get_Carrousel_Type() {
            return 'Entro a home_model --> get_Carrousel_Type';  
        }

        public function get_homePageCategory() {
            return 'Entro a home_model --> get_homePageCategory'; 
        }

        public function get_homePageOperation() {
            return 'Entro a home_model --> get_homePageOperation';
        }

        public function get_homePageCity() {
            return 'Entro a home_model --> get_homePageCity';    
        }

        public function get_homePageRecommendations() {
            return 'Entro a home_model --> get_homePageRecommendations';
        }

        public function get_homePageMostVisited() {
            return 'Entro a home_model --> get_homePageMostVisited';
        }

        

    }
?>