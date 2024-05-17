<?php
	class login_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
		}

		public static function getInstance() {
            // return 'Entro a login_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {
            return 'Entro a login_bll --> get_register_BLL';			   
		}
	}
?>