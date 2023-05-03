import express from 'express'
import manager from './script.js'
import cartmanager from './carts.js'

let server = express()

let PORT = 8080
let ready = () => console.log('server ready on port: ' + PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({ extended: true }))

let index_route = '/'
let index_function = (req, res) => {
    let quantity = manager.getProducts().length
    console.log(quantity)
    return res.send('there are ' + quantity + ' productos')
}
server.get(index_route, index_function)

//mostrar productor por el ID
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

//mostrar productos conpletos o con limit
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

//mostrar productos completos o con limit
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