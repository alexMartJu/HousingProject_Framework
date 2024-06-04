<?php
	class cart_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = cart_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
            // return 'Entro a cart_bll --> getInstance';
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

        public function get_add_update_Cart_BLL($args) {
            // return 'Entro a cart_bll --> get_add_update_Cart_BLL';
			try{
                $name_token = middleware::decode_access_token($args[0]);
                $rdo = $this -> dao ->select_products_cart($this -> db, $name_token['username'], $args[1]);
            }catch (Exception $e){
                return "error";
            }
            if(empty($rdo)){
                error_log("No vacio");
                $max_id_line = $this -> dao ->get_new_id_line($this -> db);
                $id_line = $max_id_line[0]['max_id_line'] + 1;
                error_log("$id_line");

                $rdo = $this -> dao ->insert_products_cart($this -> db, $name_token['username'], $args[1], $id_line);

                $this->dao->increment_max_id_line($this->db, $id_line);
                return "insert";
            }else{
                $rdo = $this -> dao ->update_products_cart($this -> db, $name_token['username'], $args[1]);
                return "update";
            } 
		}

        public function get_updateItemsCart_BLL($args) {
            // return 'Entro a cart_bll --> get_updateItemsCart_BLL';
            $name_token = middleware::decode_access_token($args);
			$count_lines = $this -> dao ->count_cart_lines($this -> db, $name_token['username']);
            $number_lines = $count_lines[0]['count_lines'];

            if ($number_lines != 0) {
                $response = array(
                    "type" => "numberItems",
                    "number_lines" => $number_lines
                );
            } else {
                $response = array(
                    "type" => "error"
                );
            }
        
            // Devolver el arreglo $response
            return $response;
		}

        public function get_paintCart_BLL($args) {
            // return 'Entro a cart_bll --> get_paintCart_BLL';
            $name_token = middleware::decode_access_token($args);
			return $this -> dao->getCartData($this -> db, $name_token['username']);
		}

        public function get_modifyQuantity_BLL($args) {
            try {
                $name_token = middleware::decode_access_token($args[0]);
                $id_product = $args[1]; // ID del producto
                $id_housing = $args[2]; // ID del housing
                $quantity = $args[3]; // Nueva cantidad
        
                $rdo = $this->dao->update_quantity_cart($this->db, $name_token['username'], $id_product, $id_housing, $quantity);
                error_log("$rdo");
                if ($rdo) {
                    return "update"; 
                } else {
                    return "error"; 
                }
            } catch (Exception $e) {
                return "error"; // Error al decodificar el token o al llamar al DAO
            }
        }

        public function get_delete_line_Cart_BLL($args) {
            try {
                $name_token = middleware::decode_access_token($args[0]);
                $id_line = $args[1]; // ID de la línea del carrito
                
                $rdo = $this->dao->delete_line_cart($this->db, $name_token['username'], $id_line);
                if ($rdo) {
                    return "deleted"; 
                } else {
                    return "error"; 
                }
            } catch (Exception $e) {
                return "error"; // Error al decodificar el token o al llamar al DAO
            }
        }

	}
?>
