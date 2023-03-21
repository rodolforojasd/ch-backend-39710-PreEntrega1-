import express, { Router } from 'express'
import { ProductManager } from './ProductManager.js'
import { randomUUID } from 'crypto'
import { Product } from './Product.js'
import { CartManager } from './CartManager.js'
import {Cart} from './Cart.js'

const app = express()

export const apiRouter = Router()

apiRouter.use(express.json())

apiRouter.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('./database/products.json')
const cartManager = new CartManager('./database/carts.json')
debugger

console.log(productManager.getProductsById(3))



apiRouter.get('/products', async (req, res, next) => {
    try {
        
        const products = await productManager.getProducts()
        res.json(products)

    } catch (error) {
     next(error)
    }
})

apiRouter.get('/products/:pid', async (req, res, next) => {
    try {
        const product = await productManager.getProductsById(parseInt(req.params.pid))
        res.json(product)
    } catch (error) {
        next(error)
    }
})
apiRouter.post('/products', async (req, res, next) => {
    try {
        const newProduct = new Product({
            id: 1,
            ...req.body
        })
        const added = await productManager.addProduct(newProduct)
        res.json(added)
    } catch (error) {
        next(error)
    }
})
apiRouter.put('/products/:pid', async (req, res, next) => {
    let newProduct
    try {
        newProduct = new Product({
            id: req.params.pid,
            ...req.body
        })
    } catch (error) {
        next(error)
        return
    }

    try {
        const updatedProduct = await productManager.updateProduct(req.params.pid, personaNueva)
        res.json(updatedProduct)
    } catch (error) {
        next(error)
    }
})
apiRouter.delete('/products/:pid', async (req, res, next) => {
    try {
        const deleted = await productManager.deleteProductById(req.params.pid)
        res.json(deleted)
        // res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

apiRouter.post('/carts/', async (req,res,next)=>{
    try{
        const newCart = new Cart()
        res.json(newCart)
    }catch(error){
        next(error)
    }
})

apiRouter.get('/carts/:cid', async (req, res, next) => {
    try {
        const cart = await cartManager.getCartById(parseInt(req.params.cid))
        res.json(cart.products)
    } catch (error) {
        next(error)
    }
})

apiRouter.post('/carts/:cid/product/:pid', async (req,res,next)=>{
    try{
        addedProduct = await cartManager.addToCart(req.params.cid, req.params.pid,productManager.getProductsById(req.params.pid))
        res.json(addedProduct)
    }catch(error){
        next(error)
    }
})

