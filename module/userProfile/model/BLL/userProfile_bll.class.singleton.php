<?php
	class userProfile_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = userProfile_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
            // return 'Entro a userProfile_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

        public function get_paint_userProfile_data_BLL($args) {
            try {
                $json = middleware::decode_access_token($args);
                $rdo = $this -> dao -> select_data_user($this->db, $json['username']);
                return $rdo;
            } catch (Exception $e) {
                return "error";
            }
        }

		
	}
?>