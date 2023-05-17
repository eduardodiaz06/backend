import { Router } from "express"
import cartmanager from './src/manager/carts.js'

const router = Router()

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


//Endpoint para crear un nuevo carrito 
router.post(
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
router.get(
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
router.post(
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
                    products: productId, quantity
                })
                return res.json({
                    status: 201,
                    message: 'created'
                })
            } else {
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