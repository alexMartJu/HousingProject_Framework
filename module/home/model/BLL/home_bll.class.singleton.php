<?php
	class home_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			
		}

		public static function getInstance() {
            // return 'Entro a home_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_Carrousel_Automation_BLL() {
			return 'Entro a home_bll --> get_Carrousel_Automation_BLL';
		}

		public function get_Carrousel_Type_BLL() {
			return 'Entro a home_bll --> get_Carrousel_Type_BLL';
		}

		public function get_homePageCategory_BLL() {
			return 'Entro a home_bll --> get_homePageCategory_BLL';
		}

        public function get_homePageOperation_BLL() {
			return 'Entro a home_bll --> get_homePageOperation_BLL';
		}

		public function get_homePageCity_BLL() {
			return 'Entro a home_bll --> get_homePageCity_BLL';
		}

		public function get_homePageRecommendations_BLL() {
			return 'Entro a home_bll --> get_homePageRecommendations_BLL';
		}

        public function get_homePageMostVisited_BLL() {
			return 'Entro a home_bll --> get_homePageMostVisited_BLL';
		}
	}
?>