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

        public function get_login_BLL($args) {
            // return 'Entro a login_bll --> get_login_BLL';
			try {
                // Obtener el usuario de la base de datos
                $rdo = $this -> dao ->select_user($this -> db, $args[0]);
            
                // Verificar si el usuario no existe
                if (empty($rdo)) {
                    return "error_user";
                } else {
                    // Verificar la contraseña
                    if (password_verify($args[1], $rdo[0]['password'])) {
                        // Verificar si el usuario está activado
                        if ($rdo[0]['activate'] == 1) {
                            // Crear los tokens de acceso y actualización
                            $access_token = middleware::create_access_token($rdo[0]["username"]);
                            $refresh_token = middleware::create_refresh_token($rdo[0]["username"]);
                            // Almacenar los tokens en un array
                            $token['access_token'] = $access_token;
                            $token['refresh_token'] = $refresh_token;
                            // Guardar el usuario y el tiempo en la sesión
                            $_SESSION['username'] = $rdo[0]['username'];
                            $_SESSION['tiempo'] = time();
                            session_regenerate_id(); // Regenerar el ID de la sesión por seguridad
                            // Retornar los tokens en formato JSON
                            return $token;
                        } else if ($rdo[0]['activate'] == 0) {
                            // El usuario no está activado
                            return "activate_error";
                        }
                    } else {
                        // La contraseña no es correcta
                        return "error_passwd";
                    }
                }
            } catch (Exception $e) {
                // Captura cualquier excepción y retorna un error genérico
                return "error";
            }
            
		}

        public function get_send_recover_email_BBL($args) {
			$user = $this -> dao -> select_email_recover_password($this->db, $args);
			$token = common::generate_Token_secure(20);

			if (!empty($user)) {
				$this -> dao -> update_email_recover_password($this->db, $args, $token);
                $message = ['type' => 'recover', 
                            'token' => $token, 
                            'toEmail' => $args];
                $email = json_decode(mail::send_email($message), true);
                return 'done';
            }else{
                return 'error';
            }
		}


		public function get_verify_token_BLL($args) {
			if($this -> dao -> select_verify_email($this->db, $args)){
				return 'verify';
			}
			return 'fail';
		}

		public function get_new_password_BLL($args) {
			$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
			if($this -> dao -> update_new_passwoord($this->db, $args[0], $hashed_pass)){
				return 'done';
			}
			return 'fail';
		}

        public function get_logout_BLL() {
            // return 'Entro a login_bll --> get_logout_BLL';
			unset($_SESSION['username']);
            unset($_SESSION['tiempo']);
            session_destroy();

            return 'Done';
		}

        public function get_data_user_BLL($args) {
            // return 'Entro a login_bll --> get_data_user_BLL';
			$json = middleware::decode_access_token($args);
            $rdo = $this -> dao -> select_data_user($this->db, $json['username']);
            return $rdo;
		}
	}
?>