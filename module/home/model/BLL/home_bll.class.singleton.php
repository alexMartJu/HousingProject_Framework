<?php
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = home_dao::getInstance();
		}

		public static function getInstance() {
            // return 'Entro a home_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_Carrousel_Automation_BLL() {
			// return 'Entro a home_bll --> get_Carrousel_Automation_BLL';
            return $this -> dao -> select_automation();
		}

		public function get_Carrousel_Type_BLL() {
			// return 'Entro a home_bll --> get_Carrousel_Type_BLL';
            return $this -> dao -> select_type();
		}

		public function get_homePageCategory_BLL() {
			// return 'Entro a home_bll --> get_homePageCategory_BLL';
            return $this -> dao -> select_categories();
		}

        public function get_homePageOperation_BLL() {
			// return 'Entro a home_bll --> get_homePageOperation_BLL';
            return $this -> dao -> select_operation();
		}

		public function get_homePageCity_BLL() {
			// return 'Entro a home_bll --> get_homePageCity_BLL';
            return $this -> dao -> select_city();
		}

		public function get_homePageRecommendations_BLL() {
			// return 'Entro a home_bll --> get_homePageRecommendations_BLL';
            return $this -> dao -> select_recommendations();
		}

        public function get_homePageMostVisited_BLL() {
			// return 'Entro a home_bll --> get_homePageMostVisited_BLL';
            return $this -> dao -> select_mostVisited();
		}
	}
?>