<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
            $this -> dao = search_dao::getInstance();
		}

		public static function getInstance() {
            // return 'Entro a search_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_search_type_BLL() {
			// return 'Entro a search_bll --> get_search_type_BLL';
            $selSlide = $this -> dao -> search_type();
            if (!empty($selSlide)) {
                return $selSlide;
            } 
            else {
                return "error";
            }
		}
	}
?>