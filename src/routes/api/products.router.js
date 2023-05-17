import {Router} from 'express';
import manager from './src/managers/script.js'

const router = Router()

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


//Endpoint para ver todos los productos y con ?limit=
router.get(
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
router.get(
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
router.post(
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
router.put(
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