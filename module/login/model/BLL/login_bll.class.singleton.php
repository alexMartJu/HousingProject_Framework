<?php
	class login_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
            $this -> dao = login_dao::getInstance();
		}

		public static function getInstance() {
            // return 'Entro a login_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {
            // Comprobar si el email ya existe
            try {
                $check_email = $this -> dao ->select_email();
            } catch (Exception $e) {
                return "error";
            }
        
            // Comprobar si el nombre de usuario ya existe
            try {
                $check_username = $this -> dao ->select_username();
            } catch (Exception $e) {
                return "error";
            }
        
            // Si el email existe, devuelve error_email
            if ($check_email) {
                return "error_email";
            }
        
            // Si el nombre de usuario existe, devuelve error_username
            if ($check_username) {
                return "error_username";
            }
        
            // Insertar el nuevo usuario
            try {
                $rdo = $this -> dao ->insert_user();
            } catch (Exception $e) {
                return "error";
            }
        
            // Si no se pudo insertar el usuario, devuelve error_user
            if (!$rdo) {
                return "error_user";
            }
        
            // Si se insertó el usuario correctamente, devuelve ok
            return "ok";	   
		}

        public function get_verify_email_BLL($args) {
			if($this -> dao -> select_verify_email()){
				$this -> dao -> update_verify_email();
				return 'verify';
			} else {
				return 'fail';
			}
		}
	}
?>