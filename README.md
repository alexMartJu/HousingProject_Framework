# 🏠🏢 Housing Project Realty
---
## 📝 Descripción del Proyecto
---
Housing Project es una plataforma innovadora dedicada a la compra, venta, alquiler y búsqueda de pisos compartidos. Con una interfaz sencilla y amigable, Housing Project permite a los usuarios encontrar su hogar ideal de manera rápida y eficiente. Ya sea que estés buscando comprar una nueva casa, vender tu propiedad actual, alquilar un apartamento o encontrar un compañero de piso, Housing Project es tu compañero confiable en el mercado inmobiliario.

## 🛠️Tecnologías Utilizadas
---
Este proyecto utiliza las siguientes tecnologías:

<div align="center">
  <a href="https://jwt.io" rel="nofollow">
    <img src="https://jwt.io/img/pic_logo.svg" alt="JWT" style="max-width: 100px; margin-right: 5px;">
  </a>
  <a href="https://skillicons.dev" rel="nofollow">
    <img src="https://skillicons.dev/icons?i=mysql,php,js,jquery,html,css,a=15" style="max-width: 100%;">
  </a>
</div>

## 🔗 Módulos
---
1. **🏠Home:** <br><br>
    En el módulo de Home es donde los usuarios tienen su primer contacto con la plataforma y se da la bienvenida con una presentación clara de las características principales y opciones de búsqueda de propiedades.
    - Funcionalidades:
       - Search para búsqueda dinámica
       - Visualización de propiedades separadas por secciones con carruseles dinámicos:
            - Partes de la vivienda para automatizar.
            - Tipos de vivienda (Casas, Pisos, Oficinas, Almacenes..).
            - Categorias de la vivienda (Lujosas, Con vistas al mar, Con jardín...).
            - Operaciones (Compra, Alquiler).
            - Ciudades.
            - Recomendaciones.
            - Más visitados.
            - últimas búsquedas.
       - Salto de Home a Shop al clicar sobre los carruseles.
       

2. **🛍️Shop:** <br><br>
   El módulo de Shop es el más importante, el cual ofrece una lista detallada de todas las propiedades disponibles. Permite a los usuario filtrar viviendas con distintas opciones, acceder a los detalles de la vivienda, dar like a la vivienda y incluir la vivienda al carrito entre muchas opciones.
   - Funcionalidades:
       - Listado de viviendas
       - Filtrado de viviendas por:
            - Ciudades.
            - Tipos de vivienda.
            - Categorias de la vivienda.
            - Operaciones.
            - Extras.
            - Partes a automatizar de la vivienda.
            - Ordenado de los filtros (Por precio y metros cuadrados).
       - Mapa con las vivienda ubicadas (mapBox).
       - Paginación.
       - Opción de dar Likes e incluir al carrito desde el listado y desde los detalles de la vivienda.
       - Detalles de la vivienda, con mapbox incluido de la ubicación exacta de la vivienda , scroll con las viviendas relacionadas.
       - Carrusel dinámico en el listado de las viviendas.

3. **🔍Search:** <br><br>
    El módulo de Search permite a los usuarios encontrar viviendas específicas. Este módulo se puede visualizar desde todos los módulos y está situado en el header de la web ofreciendo la posibilidad de realizar una búsqueda desde cualquier punto de la web.
   - Funcionalidades:
       - Búsqueda avanzada de la vivienda por tipo, categoría y ciudad.
       
4. **🔑Login/Register(Auth):** <br><br>
    El módulo de Auth es el más seguro de toda la aplicación, permite a los usuarios registrarse o iniciar sesión en su cuenta.
   - Funcionalidades:
       - Register:
            - Formulario de registro con validación de datos.
            - Creación del usaurio.
            - Confirmación de registro por correo electrónico (incluyendo token JWT expirable).
       - Login:
            - Inicio de sesión del usuario con validación de credenciales.
            - Protección a través de OTP via WhatsApp al poner contraseñas incorrectamente (incluyendo token JWT expirable).
            - Recuperación de la contraseña por correo electrónico (incluyendo token JWT expirable).
            - Opción de logueare mediante Social Login (Google o Github).
        - Control de la actividad del usuario a través del token JWT.

5. **🛒Cart:** <br><br>
    El módulo de Cart permite al usuario gestionar las viviendas a comprar, en él se puede ver la cesta de la compra de una forma detallada e incluye el checkout de la operación a realizar.
   - Funcionalidades:
       - Añadir o eliminar productos desde el carrito.
       - Eliminar linea de productos.
       - Visualización de los productos a comprar.
       - Control de Stock.
       - Visualización del precio total dinámicamente.
       - Checkout con resumen de la compra.
       - Checkout con validación de datos de la compra.

6. **👤Profile:** <br><br>
   El módulo de Profile permite al usuario ver y modificar su información personal, ver los likes que ha hecho y ver a través de PDF y QR sus facturas de la compra.
   - Funcionalidades:
       - Visualización y modificación de información personal.
       - Cambio de imagen de perfil solo para perfiles Locales a través de FileUpload.
       - Visualización de los likes que ha dado el usaurio.
       - Descarga de la factura de la compra a través de PDF o QR..
       - Visualización de numero de likes y facturas que tiene el usuario.
