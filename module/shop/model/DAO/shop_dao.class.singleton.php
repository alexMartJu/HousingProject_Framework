<?php
    class shop_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            // return 'Entro a shop_dao --> getInstance';
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_all_housings($db, $offset, $items_page) {

            $sql = "SELECT h.*, t.name_type, c.name_city, 
            (SELECT GROUP_CONCAT(i.img_housings SEPARATOR ';') FROM img_housings i WHERE i.id_housing = h.id_housing) AS img_housings, 
            (SELECT COUNT(*) FROM likes l WHERE l.id_housing = h.id_housing) AS likes_count
            FROM `housings` h
            INNER JOIN `h_type` t ON h.id_type = t.id_type
            INNER JOIN `operation` o ON h.id_operation = o.id_operation
            INNER JOIN `city` c ON h.id_city = c.id_city
            GROUP BY h.id_housing
            LIMIT $offset, $items_page";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar_array($stmt);
            
        }

        public function select_one_housing($db, $id) {

            $sql = "SELECT *
            FROM housings h, h_type t, operation o, city c
            WHERE h.id_housing = '$id'
            AND  h.id_type = t.id_type 
            AND h.id_operation = o.id_operation
            AND h.id_city = c.id_city";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar_object($stmt);
            
        }

        public function select_imgs_housing($db, $id) {

            $sql = "SELECT *
            FROM img_housings 
            WHERE id_housing = '$id'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar_array_indexed($stmt);
            
        }

        public function select_extras_housing($db, $id) {

            $sql = "SELECT e.id_extras, e.name_extras, e.img_extras
            FROM `extras` e INNER JOIN `housing_extras` he
            ON e.id_extras = he.id_extras
            WHERE he.id_housing = '$id'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar_array_indexed($stmt);
            
        }

        public function update_visit_count($db, $id) {

            $sql = "UPDATE housings
                    SET visit_count = visit_count + 1 
                    WHERE id_housing = '$id'";

            return $db->ejecutar($sql);
            
        }

        public function select_filters_home($db, $filters, $offset, $items_page) {

            $filter = "";
		    if (isset ($filters[0]['aut_parts'])) { //NEW
			    $filter_aut_parts = $filters[0]['aut_parts'][0];
			    $filter .= " AND h.id_housing = h_aut_p.id_housing
						    AND h_aut_p.id_aut_parts = aut_p.id_aut_parts
						    WHERE aut_p.id_aut_parts = $filter_aut_parts";
		    }
		    if (isset ($filters[0]['type'])) {
			    $filter_type = $filters[0]['type'][0];
			    $filter .= " WHERE t.id_type = '$filter_type'";
		    }
		    if (isset ($filters[0]['category'])) {
			    $filter_category = $filters[0]['category'][0];
			    $filter .= " AND h.id_housing = hc.id_housing
						    AND cat.id_category = hc.id_category
						    WHERE cat.id_category = '$filter_category'";
		    }
		    if (isset ($filters[0]['operation'])) {
			    $filter_operation = $filters[0]['operation'][0];
			    $filter .= " WHERE o.id_operation = '$filter_operation'";
		    }
		    if (isset ($filters[0]['city'])) {
			    $filter_city = $filters[0]['city'][0];
			    $filter .= " WHERE c.id_city = '$filter_city'";
		    }

            $sql = "SELECT h.*, t.name_type, c.name_city, GROUP_CONCAT(i.img_housings SEPARATOR ';') AS img_housings
            FROM `housings` h
            INNER JOIN `h_type` t ON h.id_type = t.id_type
            INNER JOIN `city` c ON h.id_city = c.id_city
            INNER JOIN `operation` o ON h.id_operation = o.id_operation
            INNER JOIN `img_housings` i ON h.id_housing = i.id_housing
            INNER JOIN `housing_category` hc ON h.id_housing = hc.id_housing
            INNER JOIN `category` cat ON hc.id_category = cat.id_category
            INNER JOIN `housing_automation_parts` h_aut_p ON h.id_housing = h_aut_p.id_housing
            INNER JOIN `automation_parts` aut_p ON h_aut_p.id_aut_parts = aut_p.id_aut_parts
            $filter
            GROUP BY h.id_housing
            LIMIT $offset, $items_page";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar_array($stmt);
            
        }

        public function select_filters_shop($db, $filters, $offset, $items_page) {

            $filter = "";
            $order = "";
            $whereClauseAdded = false; // Variable para controlar si ya se ha añadido una cláusula WHERE

            // Recorremos los filtros
            for ($i = 0; $i < count($filters); $i++) {
                // Manejamos el filtro 'name_city'
                if ($filters[$i][0] == 'name_city') {
                    $filter .= ($whereClauseAdded ? " AND " : " WHERE ") . $filters[$i][0] . " IN ('" . implode("','", $filters[$i][1]) . "')";
                    $whereClauseAdded = true; // Se añadió una cláusula WHERE
                }
                // Manejamos el filtro 'name_orderby'
                elseif ($filters[$i][0] == 'name_orderby') {
                    $order = "ORDER BY " . ($filters[$i][1] == 'Price' ? "h.housing_price ASC" : "h.housing_M2 ASC");
                }
                // Manejamos otros filtros
                else {
                    $filter .= ($whereClauseAdded ? " AND " : " WHERE ") . $filters[$i][0] . "= '" . $filters[$i][1] . "'";
                    $whereClauseAdded = true; // Se añadió una cláusula WHERE
                }
            }

            // Construimos la consulta SQL
            $sql = "SELECT h.*, t.name_type, c.name_city, o.name_operation,
            (SELECT GROUP_CONCAT(i.img_housings SEPARATOR ';') 
            FROM img_housings i 
            WHERE i.id_housing = h.id_housing) AS img_housings
            FROM `housings` h
            INNER JOIN `h_type` t ON h.id_type = t.id_type
            INNER JOIN `city` c ON h.id_city = c.id_city
            INNER JOIN `operation` o ON h.id_operation = o.id_operation
            INNER JOIN `housing_category` hc ON h.id_housing = hc.id_housing
            INNER JOIN `category` cat ON hc.id_category = cat.id_category
            INNER JOIN `housing_extras` he ON h.id_housing = he.id_housing
            INNER JOIN `extras` e ON he.id_extras = e.id_extras
            INNER JOIN `housing_automation_parts` h_aut_p ON h.id_housing = h_aut_p.id_housing
            INNER JOIN `automation_parts` aut_p ON h_aut_p.id_aut_parts = aut_p.id_aut_parts
            $filter
            GROUP BY h.id_housing $order
            LIMIT $offset, $items_page";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar_array($stmt);
            
        }

        public function print_dynamic_filter_city($db) {
            // return 'Entro a shop_dao --> print_dynamic_filter_city';
            $sql = "SELECT id_city, name_city
            FROM city
            ORDER BY id_city";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function print_dynamic_filter_type($db) {
            // return 'Entro a shop_dao --> print_dynamic_filter_type';
            $sql = "SELECT id_type, name_type
            FROM h_type
            ORDER BY id_type";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function print_dynamic_filter_operation($db) {
            // return 'Entro a shop_dao --> print_dynamic_filter_operation';
            $sql = "SELECT id_operation, name_operation
            FROM operation
            ORDER BY id_operation";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function print_dynamic_filter_category($db) {
            // return 'Entro a shop_dao --> print_dynamic_filter_category';
            $sql = "SELECT id_category, name_category
            FROM category
            ORDER BY id_category";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function print_dynamic_filter_extras($db) {
            // return 'Entro a shop_dao --> print_dynamic_filter_extras';
            $sql = "SELECT id_extras, name_extras
            FROM extras
            ORDER BY id_extras";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function print_dynamic_filter_distinctweb($db) {
            // return 'Entro a shop_dao --> print_dynamic_filter_distinctweb';
            $sql = "SELECT id_aut_parts, name_aut_parts
            FROM automation_parts
            ORDER BY id_aut_parts";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function count_filters_home($db, $filters) {
            // return 'Entro a shop_dao --> count_filters_home';
            $filter = "";
            if (isset ($filters[0]['aut_parts'])) { //NEW
                $filter_aut_parts = $filters[0]['aut_parts'][0];
                $filter .= " AND h.id_housing = h_aut_p.id_housing
                            AND h_aut_p.id_aut_parts = aut_p.id_aut_parts
                            WHERE aut_p.id_aut_parts = $filter_aut_parts";
            }
            if (isset ($filters[0]['type'])) {
                $filter_type = $filters[0]['type'][0];
                $filter .= " WHERE t.id_type = '$filter_type'";
            }
            if (isset ($filters[0]['category'])) {
                $filter_category = $filters[0]['category'][0];
                $filter .= " AND h.id_housing = hc.id_housing
                            AND cat.id_category = hc.id_category
                            WHERE cat.id_category = '$filter_category'";
            }
            if (isset ($filters[0]['operation'])) {
                $filter_operation = $filters[0]['operation'][0];
                $filter .= " WHERE o.id_operation = '$filter_operation'";
            }
            if (isset ($filters[0]['city'])) {
                $filter_city = $filters[0]['city'][0];
                $filter .= " WHERE c.id_city = '$filter_city'";
            }

            $sql = "SELECT COUNT(DISTINCT h.id_housing) contador
            FROM `housings` h
            INNER JOIN `h_type` t ON h.id_type = t.id_type
            INNER JOIN `city` c ON h.id_city = c.id_city
            INNER JOIN `operation` o ON h.id_operation = o.id_operation
            INNER JOIN `img_housings` i ON h.id_housing = i.id_housing
            INNER JOIN `housing_category` hc ON h.id_housing = hc.id_housing
            INNER JOIN `category` cat ON hc.id_category = cat.id_category
            INNER JOIN `housing_automation_parts` h_aut_p ON h.id_housing = h_aut_p.id_housing
            INNER JOIN `automation_parts` aut_p ON h_aut_p.id_aut_parts = aut_p.id_aut_parts
            $filter";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function count_filters_shop($db, $filters__shop) {
            // return 'Entro a shop_dao --> count_filters_shop';
            $filter = "";
            $order = "";
            $whereClauseAdded = false; // Variable para controlar si ya se ha añadido una cláusula WHERE

            // Recorremos los filtros
            for ($i = 0; $i < count($filters__shop); $i++) {
                // Manejamos el filtro 'name_city'
                if ($filters__shop[$i][0] == 'name_city') {
                    $filter .= ($whereClauseAdded ? " AND " : " WHERE ") . $filters__shop[$i][0] . " IN ('" . implode("','", $filters__shop[$i][1]) . "')";
                    $whereClauseAdded = true; // Se añadió una cláusula WHERE
                }
                // Manejamos el filtro 'name_orderby'
                elseif ($filters__shop[$i][0] == 'name_orderby') {
                    $order = "ORDER BY " . ($filters__shop[$i][1] == 'Price' ? "h.housing_price ASC" : "h.housing_M2 ASC");
                }
                // Manejamos otros filtros
                else {
                    $filter .= ($whereClauseAdded ? " AND " : " WHERE ") . $filters__shop[$i][0] . "= '" . $filters__shop[$i][1] . "'";
                    $whereClauseAdded = true; // Se añadió una cláusula WHERE
                }
            }

            // Construimos la consulta SQL
            $sql = "SELECT COUNT(DISTINCT h.id_housing) contador
            FROM `housings` h
            INNER JOIN `h_type` t ON h.id_type = t.id_type
            INNER JOIN `city` c ON h.id_city = c.id_city
            INNER JOIN `operation` o ON h.id_operation = o.id_operation
            INNER JOIN `housing_category` hc ON h.id_housing = hc.id_housing
            INNER JOIN `category` cat ON hc.id_category = cat.id_category
            INNER JOIN `housing_extras` he ON h.id_housing = he.id_housing
            INNER JOIN `extras` e ON he.id_extras = e.id_extras
            INNER JOIN `housing_automation_parts` h_aut_p ON h.id_housing = h_aut_p.id_housing
            INNER JOIN `automation_parts` aut_p ON h_aut_p.id_aut_parts = aut_p.id_aut_parts
            $filter
            $order";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }

        public function count_all($db) {
            // return 'Entro a shop_dao --> count_all';
            $sql = "SELECT COUNT(*) contador
            FROM housings";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
            
        }
    }
?>