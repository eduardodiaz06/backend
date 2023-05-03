//const fs  = require ("fs")
import fs from 'fs'

class CartManager {
    constructor(path) {
        this.carts = [] // aloja todos los carritos
        this.path = path  // parametro con la ruta del archivo de carts guardados
        this.init(path)
    }

    init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            fs.writeFileSync(path, '[]')
            console.log('file created at path: ' + this.path)
            return 'file creater at path: ' + this.path
        } else {
            this.carts = JSON.parse(fs.readFileSync(path, 'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }
    async addCart({ products }) {
        try {
            let data = { products }
            if (this.carts.length > 0) {
                let next_id = this.carts[this.carts.length - 1].id + 1
                data.id = next_id
            } else {
                data.id = 1
            }
            this.carts.push(data)
            let data_json = JSON.stringify(this.carts, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log(data.id)
            return data.id
        } catch (error) {
            console.log(error)
            return 'addCart: error'
        }
    }
    getCarts() {
        try {
            if (!this.carts) {
                console.log('Not found')
                return null
            } else {
                console.log(this.carts)
                return this.carts
            }
        } catch (error) {
            console.log(error)
            return 'getCarts: error'
        }

    }

    getCartById(id) {
        try {
            let one = this.carts.find(each => each.id === id)
            if (!one) {
                console.log('Not found')
                return null
            } else {
                console.log(one)
                return one
            }
        } catch (error) {
            console.log(error)
            return 'getCartById: error'

        }
    }
}

let cart = new CartManager('./data/carts.json')
async function manager() {
    

    //await cart.addCart({ products: { pid: '6', quantity: '1' } })
    //await cart.getCarts()
    //await cart.getCartById(3)

}
//manager()

export default cart

