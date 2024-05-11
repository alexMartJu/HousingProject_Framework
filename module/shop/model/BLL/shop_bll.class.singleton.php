<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			
		}

		public static function getInstance() {
            // return 'Entro a shop_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_all_housings_BLL($args) {
            return 'Entro a shop_bll --> get_all_housings_BLL';
		}
	}
?>