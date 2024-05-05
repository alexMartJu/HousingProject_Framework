<?php
    class home_model {

        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = home_bll::getInstance();
        }

        public static function getInstance() {
            // return 'Entro a home_model --> getInstance';
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_Carrousel_Automation() {
            // return 'Entro a home_model --> get_Carrousel_Automation'; 
            return $this -> bll -> get_Carrousel_Automation_BLL();
        }

        public function get_Carrousel_Type() {
            // return 'Entro a home_model --> get_Carrousel_Type';
            return $this -> bll -> get_Carrousel_Type_BLL();  
        }

        public function get_homePageCategory() {
            // return 'Entro a home_model --> get_homePageCategory'; 
            return $this -> bll -> get_homePageCategory_BLL();
        }

        public function get_homePageOperation() {
            // return 'Entro a home_model --> get_homePageOperation';
            return $this -> bll -> get_homePageOperation_BLL();
        }

        public function get_homePageCity() {
            // return 'Entro a home_model --> get_homePageCity';   
            return $this -> bll -> get_homePageCity_BLL(); 
        }

        public function get_homePageRecommendations() {
            // return 'Entro a home_model --> get_homePageRecommendations';
            return $this -> bll -> get_homePageRecommendations_BLL();
        }

        public function get_homePageMostVisited() {
            // return 'Entro a home_model --> get_homePageMostVisited';
            return $this -> bll -> get_homePageMostVisited_BLL();
        }

        

    }
?>