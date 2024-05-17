<?php
	class login_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
            $this -> dao = login_dao::getInstance();
            $this -> db = db::getInstance();
		}

		public static function getInstance() {
            // return 'Entro a login_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_register_BLL($args) {

            $hashed_pass = password_hash($args[2], PASSWORD_DEFAULT, ['cost' => 12]);
            $hashavatar = md5(strtolower(trim($args[1]))); 
            $avatar = "https://i.pravatar.cc/500?u=$hashavatar";
            $token_email = common::generate_Token_secure(20);

            // Comprobar si el email ya existe
            try {
                $check_email = $this -> dao ->select_email($this -> db, $args[1]);
            } catch (Exception $e) {
                return "error";
            }
        
            // Comprobar si el nombre de usuario ya existe
            try {
                $check_username = $this -> dao ->select_username($this -> db, $args[0]);
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
                $rdo = $this -> dao ->insert_user($this -> db, $args[0], $args[1], $args[2], $hashed_pass, $avatar, $token_email);
            } catch (Exception $e) {
                return "error";
            }
        
            // Si no se pudo insertar el usuario, devuelve error_user
            if (!$rdo) {
                return "error_user";
            }
            $message = [ 'type' => 'validate', 
								'token' => $token_email, 
								'toEmail' =>  $args[0]];
			$email = json_decode(mail::send_email($message), true);
            // Si se insertó el usuario correctamente, devuelve ok
            return "ok";	   
		}

        public function get_verify_email_BLL($args) {
			if($this -> dao -> select_verify_email($this -> db, $args)){
				$this -> dao -> update_verify_email($this -> db, $args);
				return 'verify';
			} else {
				return 'fail';
			}
		}
	}
?>