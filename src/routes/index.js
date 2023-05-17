import {Router} from "express"
import carts_router from "./carts.router.js"
import products_router from "./products.router.js"

const router = Router()

router.use('/products',products_router)
router.use('/carts',carts_router)

export default router