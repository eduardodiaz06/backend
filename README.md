# Tercera Entrega Back (Servidor con Express)
 
En esta Tercera entrega se creó un servidor basado en express donde se pueden hacer consultas a nuestro archivo de productos y carritos.
 
## Creacion de endpoints para productos y carritos

- GET /api/products
- GET /api/products/:pid
- GET /api/carts
- GET /api/carts/:cid

### Creación de de la Clase CartManager y sus metodos

- addCart (agregar carritos al archivo de datos carts.json)
- getCarts (mostrar carritos del archivo)
- getCartById(pid) (mostrar carrito indicado por el ID)