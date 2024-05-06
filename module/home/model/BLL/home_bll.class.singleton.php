<?php
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = home_dao::getInstance();
			$this -> db = db::getInstance();
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
            return $this -> dao -> select_automation($this -> db);
		}

		public function get_Carrousel_Type_BLL() {
			// return 'Entro a home_bll --> get_Carrousel_Type_BLL';
            return $this -> dao -> select_type($this -> db);
		}

		public function get_homePageCategory_BLL() {
			// return 'Entro a home_bll --> get_homePageCategory_BLL';
            return $this -> dao -> select_categories($this -> db);
		}

        public function get_homePageOperation_BLL() {
			// return 'Entro a home_bll --> get_homePageOperation_BLL';
            return $this -> dao -> select_operation($this -> db);
		}

		public function get_homePageCity_BLL() {
			// return 'Entro a home_bll --> get_homePageCity_BLL';
            return $this -> dao -> select_city($this -> db);
		}

		public function get_homePageRecommendations_BLL() {
			// return 'Entro a home_bll --> get_homePageRecommendations_BLL';
            return $this -> dao -> select_recommendations($this -> db);
		}

        public function get_homePageMostVisited_BLL() {
			// return 'Entro a home_bll --> get_homePageMostVisited_BLL';
            return $this -> dao -> select_mostVisited($this -> db);
		}
	}
?>