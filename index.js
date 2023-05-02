class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct({ title, description, price, thumbnail, stock }) {
        let id = 0
        if (!title || !description || !price || !thumbnail || !stock) {
            console.error("Todos los campos son obligatorios");
            return;
          }
        if (this.products.length === 0) {
            id = 1
        } else {

            let lastProducts = this.products[this.products.length - 1]
            id = lastProducts.id + 1
        }

        let producto = { title, description, price, thumbnail, stock, id }
        this.products.push(producto)
    }

    getProduct() {
        console.log(this.products)
        return this.products
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
          console.error(`Not Found ${id}`);
        }
        return product;
      }

}

let producto = new ProductManager()

producto.addProduct({
    title: "Gata Hidraulica",
    description: "Gata para talleres automotrices",
    price: 1300000,
    thumbnail: "https://aco.cl/imagenes/productos/047241.jpg", 
    stock: 5
})
producto.addProduct({
    title: "producto2",
    description: "prueba",
    price: 15000,
    thumbnail: "https://aco.cl/imagenes/productos/047242.jpg", 
    stock: 3
})

producto.addProduct({
    title: "producto3",
    description: "prueba",
    price: 12000,
    thumbnail: "https://aco.cl/imagenes/productos/047243.jpg", 
    //stock: 8
})

producto.getProduct()
producto.getProductById(4)




