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

        
		public function get_change_personalInfo_BLL($args) {
            try {
                $json = middleware::decode_access_token($args[0]);
                if ($this -> dao->checkUserProfile($this->db, $json['username'])) {
					// El perfil del usuario ya existe, por lo que actualizamos la información
					$this -> dao ->updateUserProfile($this->db, $json['username'], $args[1], $args[2], $args[3], $args[4], $args[5]);
					return "insert_info";
				} else {
					// El perfil del usuario no existe, por lo que insertamos una nueva entrada
					$this -> dao ->insertUserProfile($this->db, $json['username'], $args[1], $args[2], $args[3], $args[4], $args[5]);
					return "update_info";
				}
            } catch (Exception $e) {
                return "error";
            }
        }

		public function get_list_likes_user_BLL($args) {
            try {
                $json = middleware::decode_access_token($args);
                $likesData = $this->dao->getLikesDataByUsername($this->db, $json['username']);
        
				foreach ($likesData as $like) {
					error_log("like_data: " . json_encode($like)); // Registra cada objeto individualmente
				}
				// Verificar si los datos de los likes no están vacíos
				if (!empty($likesData)) {
					return $likesData; 
				} else {
					return "there_arent_likes";
				}
            } catch (Exception $e) {
				error_log("Error en get_list_likes_user_BLL: " . $e->getMessage()); // Registra cualquier excepción en el registro de errores
                return "error";
            }
        }

		public function get_list_invoices_user_BLL($args) {
            try {
                $json = middleware::decode_access_token($args);
                $invoicesData = $this->dao->getInvoicesDataByUsername($this->db, $json['username']);
        
				// Verificar si los datos de los likes no están vacíos
				if (!empty($invoicesData)) {
					return $invoicesData; 
				} else {
					return "there_arent_invoices";
				}
            } catch (Exception $e) {
				error_log("Error en get_list_invoices_user_BLL: " . $e->getMessage()); // Registra cualquier excepción en el registro de errores
                return "error";
            }
        }

		public function get_upload_file_user_BLL($args) {
            try {
                $json = middleware::decode_access_token($args[1]);
				$userData = $this->dao->getLoginTypeByUsername($this->db, $json['username']);
				if (!empty($userData)) {
					$loginType = $userData[0]['login_type']; 
					if ($loginType === "Local") {
						$fileName = FileUpload::uploadFile($args[0]);
						error_log("Login type for user: " . $loginType);
						if ($fileName) {
							// Actualizar la imagen de perfil en la base de datos
							$this->dao->updateAvatar($this->db, $json['username'], $fileName);
							error_log("Avatar updated for username: " . $json['username']);
							return "update_Avatar_done";
						} else {
							error_log("File upload failed for username: " . $json['username']);
							return "fail_upload";
							// Manejar el caso en el que no se pudo subir el archivo
						}
					} else {
						error_log("Invalid user type for username: " . $json['username']);
						return "user_invalid";
					}
				} else {
					error_log("No user data found for username: " . $json['username']);
					return "no_data";
				}
            } catch (Exception $e) {
				error_log("Error en get_list_invoices_user_BLL: " . $e->getMessage()); // Registra cualquier excepción en el registro de errores
                return "error";
            }
        }
	}
?>