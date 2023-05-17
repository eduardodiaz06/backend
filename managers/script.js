//const fs = require('fs');
import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.products = [] // aloja todos los productos 
        this.path = path  // parametro con la ruta del archivo de productos guardados
        this.init(path)
    }

    init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            fs.writeFileSync(path, '[]')
            console.log('file created at path: ' + this.path)
            return 'file creater at path: ' + this.path
        } else {
            this.products = JSON.parse(fs.readFileSync(path, 'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }
    async addProduct({ title, description,code, price, status,category,stock, thumbnail }) {
        stock = stock ?? 0
        try {
            let data = { title, description,code, price, status,category,stock, thumbnail }
            if (this.products.length > 0) {
                let next_id = this.products[this.products.length - 1].id + 1
                data.id = next_id
            } else {
                data.id = 1
            }
            this.products.push(data)
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log(data.id)
            return data.id
        } catch (error) {
            console.log(error)
            return 'addProduct: error'
        }
    }
    getProducts() {
        try {
            if (!this.products) {
                console.log('Not found')
                return null
            } else {
                console.log(this.products)
                return this.products
            }
        } catch (error) {
            console.log(error)
            return 'getProducts: error'
        }

    }

    getProductById(id) {
        try {
            let one = this.products.find(each => each.id === id)
            if (!one) {
                console.log('Not found')
                return null
            } else {
                console.log(one)
                return one
            }
        } catch (error) {
            console.log(error)
            return one
        }
    }
    async updateProduct(id, data) {
        try {
            let one = this.getProductById(id)
            if (!one) {
                console.log('updateProduct: error')
                return 'updateProduct: error'
            }
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('updateProduct: done')
            return 'updateProduct: done'
        } catch (error) {
            console.log(error)
            return 'updateProduct: error'
        }
    }
    async deleteProduct(id) {
        try {
            let one = this.getProductById(id)
            if (!one) {
                console.log('deleteProduct: error')
                return 'deleteProduct: error'
            }
            this.products = this.products.filter(each => each.id !== id)
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('deleteProduct: done')
            return 'deleteProduct: done'
        } catch (error) {
            console.log(error)
            return 'deleteProduct: error'
        }
    }
}
let product = new ProductManager('./data/data.json')

async function manager() {

    await product.addProduct({
        title: "Gata Hidraulica", description: "Gata para talleres automotrices", price: 1300000,
        thumbnail: "https://aco.cl/imagenes/productos/047241.jpg", stock: 5
    })
    await product.addProduct({
        title: "Banquillo Mecanico", description: "BANQUILLOS MECANICOS 3 TONELADAS (PAR) 288-430mm T", price: 27073,
        thumbnail: "https://aco.cl/imagenes/productos/035560.jpg", stock: 3
    })
    await product.addProduct({
        title: "Pulidora", description: "PULIDORA 7'; 1600W LP 1018/4/220", price: 61404,
        thumbnail: "https://aco.cl/imagenes/productos/051423.jpg", stock: 6
    })
    await product.addProduct({
        title: "Rotomartillo", description: "ROTOMARTILLO SDS PLUS 1050W 4,5 J RM 926M/1/220 K", price: 74970,
        thumbnail: "https://aco.cl/imagenes/productos/055057.jpg", stock: 9
    })
    await product.addProduct({
        title: "Tronzadora", description: "TRONZADORA SENSITIVA 14'; 2500W + 3 discos CS814/4", price: 116382,
        thumbnail: "https://aco.cl/imagenes/productos/053790.jpg", stock: 15
    })
    await product.addProduct({
        title: "Aspiradora", description: "ASPIRADORA INALAMBRICA 18V 20L SIN BAT A818/0", price: 68723,
        thumbnail: "https://aco.cl/imagenes/productos/054674.jpg", stock: 20
    })
    await product.addProduct({
        title: "Soldadora", description: "SOLDADORA INV ARCO MANUAL 140 amp IE 9140/220M", price: 82110,
        thumbnail: "https://aco.cl/imagenes/productos/050363.jpg", stock: 7
    })
    await product.addProduct({
        title: "Lijadora", description: "LIJADORA DE BANDA 3X21'; 900W LB 976", price: 49980,
        thumbnail: "https://aco.cl/imagenes/productos/053708.jpg", stock: 4
    })
    await product.addProduct({
        title: "Inflador", description: "INFLADOR INALAMBRICO USB PARA NEUMATICOS", price: 55124,
        thumbnail: "https://aco.cl/imagenes/productos/055124.jpg", stock: 9
    })
    await product.addProduct({
        title: "Carro Herramientas", description: "CARRO PORTA HERRAMIENTAS CON BAUL 8 CAJONES NTBT13", price: 154938,
        thumbnail: "https://aco.cl/imagenes/productos/036151.jpg", stock: 16
    })
    await product.getProductById(9)
    await product.updateProduct(9, { title: 'nombre modificado' })
    await product.deleteProduct(10)
    await product.getProducts()


}

//manager()

export default product