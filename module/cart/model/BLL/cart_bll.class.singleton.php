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
            try {
                $name_token = middleware::decode_access_token($args[0]);
                $username = $name_token['username'];
                $id_housing = $args[1];
                
                // Obtener la información del producto en el carrito
                $product_in_cart = $this->dao->select_products_cart($this->db, $username, $id_housing);
                
                // Obtener el stock disponible del producto
                $stock_available_array = $this->dao->select_product_info($this->db, $id_housing);
                
                // Verificar si el stock está disponible para al menos uno de los productos
                $stock_available = false;
                foreach ($stock_available_array as $stock_info) {
                    if ($stock_info['stock'] > 0) {
                        $stock_available = true;
                        break;
                    }
                }
        
                if (empty($product_in_cart)) {
                    // Si el producto no está en el carrito, insertar un nuevo registro
                    
                    // Verificar si el stock disponible es suficiente
                    if ($stock_available) {
                        $max_id_line = $this->dao->get_new_id_line($this->db);
                        $id_line = $max_id_line[0]['max_id_line'] + 1;
                        
                        $this->dao->insert_products_cart($this->db, $username, $id_housing, $id_line);
                        
                        // Incrementar el contador de ID de línea
                        $this->dao->increment_max_id_line($this->db, $id_line);
                        
                        return "insert";
                    } else {
                        return "out_of_stock";
                    }
                } else {
                    // Si el producto ya está en el carrito, actualizar el registro existente
                    
                    // Inicializar un flag para determinar si se realizó una actualización
                    $updated = false;
        
                    foreach ($product_in_cart as $product) {
                        $quantity = $product['quantity'];
                        $id_product = $product['id_product'];
                    
                        // Buscar el stock disponible para el producto actual
                        $current_stock = 0;
                        foreach ($stock_available_array as $stock_info) {
                            if ($stock_info['id_product'] == $id_product) {
                                $current_stock = $stock_info['stock'];
                                break;
                            }
                        }
                    
                        // Verificar si la cantidad actual es menor al stock disponible
                        if ($quantity < $current_stock) {
                            $this->dao->update_products_cart($this->db, $username, $id_housing, $id_product);
                            $updated = true; // Esta variable se puede usar para verificar si se realizó alguna actualización
                        }
                    }
                    
                    if ($updated) {
                        return "update"; // Se actualizó un producto
                    } else {
                        return "exceeds_stock"; // Todos los productos están al máximo de su stock disponible
                    }
                }
            } catch (Exception $e) {
                return "error";
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

        public function get_removeProduct_BLL($args) {
            try {
                $name_token = middleware::decode_access_token($args[0]);
                $username = $name_token['username'];
                $id_line = $args[1];
                $id_housing = $args[2];
                $id_product = $args[3];
                $result = $this->dao->remove_product_from_cart($this->db, $username, $id_line, $id_housing, $id_product);
                return $result ? "product_removed" : "error_removing_product";
            } catch (Exception $e) {
                return "error";
            }
        }

	}
?>
