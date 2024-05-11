<?php
	class shop_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = shop_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
            // return 'Entro a shop_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_all_housings_BLL($args) {
            // return 'Entro a shop_bll --> get_all_housings_BLL';
			try {
                $Dates_Housings = $this -> dao -> select_all_housings($this -> db, $args[0], $args[1]);
            } catch (Exception $e) {
                return "error";
            }
            
            if (!empty($Dates_Housings)) {
                return $Dates_Housings;
            } else {
                return "error";
            }     
		}
	}
?>