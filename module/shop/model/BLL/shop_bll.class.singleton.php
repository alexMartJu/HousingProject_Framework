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

		public function get_details_housing_BLL($args) {
            // return 'Entro a shop_bll --> get_details_housing_BLL';
			try {
				$Date_housing = $this -> dao -> select_one_housing($this -> db, $args);
			} catch (Exception $e) {
				return "error";
			}
			try {
				$Date_images = $this -> dao -> select_imgs_housing($this -> db, $args);
			} catch (Exception $e) {
				return "error";
			}
			try {
				$Date_extras = $this -> dao -> select_extras_housing($this -> db, $args);
			} catch (Exception $e) {
				return "error";
			}
	
			if (!empty($Date_housing || $Date_images || $Date_extras)) {
				// Updatear visit count solo si se han obtenido datos exitosamente
				try {
					$this->dao->update_visit_count($this->db, $args);
				} catch (Exception $e) {
					return "error";
				}

				$rdo = array();
				$rdo[0] = $Date_housing;
				$rdo[1][] = $Date_images;
				$rdo[2][] = $Date_extras;
				return $rdo;
			} else {
				return "error";
			}
		}

		public function get_filters_home_BLL($args) {
            // return 'Entro a shop_bll --> get_filters_home_BLL';
			try {
				$Dates_Housings = $this -> dao ->select_filters_home($this -> db, $args[0], $args[1], $args[2]);
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