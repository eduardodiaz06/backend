import express from 'express'
import manager from './script.js'
import cartmanager from './carts.js'

let server = express()

let PORT = 8080
let ready = () => console.log('server ready on port: ' + PORT)

server.listen(PORT, ready)
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

let index_route = '/'
let index_function = (req, res) => {
    let quantity = manager.getProducts().length
    console.log(quantity)
    return res.send('there are ' + quantity + ' productos')
}
//server.get(index_route, index_function)

//mostrar productos por el ID
let one_route = '/api/products/:pid'
let one_function = (req, res) => {
    let parametros = req.params
    let id = Number(parametros.pid)
    //console.log(parametros)
    let one = manager.getProductById(id)
    //console.log(one)
    if (one) {
        return res.send({
            success: true,
            response: one
        })
    } else {
        return res.send({
            success: false,
            response: {}
        })
    }

}
server.get(one_route, one_function)

//mostrar productos completos o con limit
let query_products = '/api/products'
let query_function = (req, res) => {
    let limit = req.query.limit
    let products = manager.getProducts().slice(0, limit)
    if (products.length > 0) {
        return res.send({
            success: true,
            response: products
        })
    } else {
        return res.send({
            success: false,
            response: 'not found'
        })
    }

}
server.get(query_products, query_function)

//mostrar carritos por el ID
let oneCart_route = '/api/carts/:cid'
let oneCart_function = (req, res) => {
    let parametros = req.params
    let id = Number(parametros.cid)
    let one = cartmanager.getCartById(id)
    if (one) {
        return res.send({
            success: true,
            response: one
        })
    } else {
        return res.send({
            success: false,
            response: 'Not Found'
        })
    }

}
server.get(oneCart_route, oneCart_function)

//mostrar carros completos o con limit
let query_cart = '/api/carts'
let queryCart_function = (req, res) => {
    let limit = req.query.limit
    let carts = cartmanager.getCarts().slice(0, limit)
    if (carts.length > 0) {
        return res.send({
            success: true,
            response: carts
        })
    } else {
        return res.send({
            success: false,
            response: 'not found'
        })
    }

}
server.get(query_cart, queryCart_function)





//Endpoint para ver todos los productos y con ?limit=
server.get(
    '/api/products',
    (req, res) => {
        let limit = req.query.limit
        let products = manager.getProducts().slice(0, limit)
        if (products.length > 0) {
            return res.json({
                status: 201,
                message: products
            })
        } else {
            return res.json({
                success: false,
                response: 'not found'
            })
        }
    }

)

//Endpoint para ver producto por id
server.get(
    '/api/products/:pid',
    (req, res) => {
        let parametros = req.params
        let id = Number(parametros.pid)
        //console.log(parametros)
        let one = manager.getProductById(id)
        //console.log(one)
        if (one) {
            return res.send({
                success: true,
                response: one
            })
        } else {
            return res.send({
                success: false,
                response: {}
            })
        }

    }
)


//Endpoint para agregar producto
server.post(
    '/products',
    async (req, res) => {
        try {
            let title = req.body.title ?? null
            let description = req.body.description ?? null
            let code = req.body.code ?? null
            let price = req.body.price ?? null
            let status = req.body.status ?? null
            let category = req.body.category ?? null
            let stock = req.body.stock ?? null
            let thumbnail = req.body.thumbnail ?? null

            if (title && description && code && price && status && category && stock && thumbnail) {
                let product = await manager.addProduct({
                    title, description, code,
                    price, status, category, stock, thumbnail
                })
                return res.json({
                    status: 201,
                    message: 'created'
                })
            } else {
                return res.json({
                    status: 404,
                    message: 'check data!'
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: 'error'
            })
        }

    }


)

//Endpoint para modificar producto
server.put(
    '/products/:pid',
    (req, res) => {
        if (req.body && req.params.pid) {
            let id = Number(req.params.pid)
            let data = req.body
            manager.updateProduct(id, data)
            return res.json({
                status: 200,
                message: 'product updated'
            })
        } else {
            return res.json({
                status: 400,
                message: 'check data!'
            })

        }

    }

)

//Endpoint para crear un nuevo carrito 
server.post(
    '/api/carts',
    async (req, res) => {
        try {
            let products = req.body.products ?? null

            if (products) {
                let product = await cartmanager.addCart({
                    products
                })
                return res.json({
                    status: 201,
                    message: 'created'
                })
            } else {
                return res.json({
                    status: 404,
                    message: 'check data!'
                })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: 'error'
            })
        }

    }

)

//Endpoint para buscar los productos del carrito por id
server.get(
    '/api/carts/:cid',
    (req, res) => {
        let parametros = req.params
        let id = Number(parametros.cid)
        //console.log(parametros)
        let one = cartmanager.getCartById(id)
        //console.log(one)
        if (one) {
            return res.send({
                success: true,
                response: one
            })
        } else {
            return res.send({
                success: false,
                response: {}
            })
        }

    }

)

//Endpoint para agregar un producto al arreglo de productos del carrito
server.post(
    '/api/carts/:cid/product/:pid',
   async (req, res) => {
        try {
            //encontrar id de carrito y id de producto
            let parametro1 = req.params
            let cartId = Number(parametro1.cid)
            let parametro2 = req.params
            let productId = Number(parametro2.pid)
            let products = req.body.products ?? null
            let quantity = 1

            if (cartId) {
                let product = await cartmanager.addCart({
                    products:productId,quantity
                })
                return res.json({
                    status: 201,
                    message: 'created'
                })
            }else{
                return res.send({
                    message: 'carrito no encontrado'
                })
            }

        } catch (error) {
            console.log(error)
            return res.json({
                status: 500,
                message: 'error'
            })
        }

    }

)