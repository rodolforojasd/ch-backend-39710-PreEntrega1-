import express, { Router } from 'express'
import { ProductManager } from './ProductManager.js'
import { randomUUID } from 'crypto'
import { Product } from './Product'
import { CartManager } from './CartManager.js'
import {Cart} from './Cart'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('./database/products.json')
const cartManager = new CartManager('./database/carts.json')
// productManager.addProduct('Añejo Patrón','Tequila 100% Agave, Hecho en México', 6800, 25,'licores',['./static/img/products/anejopatron.jpg'])
// productManager.addProduct('Bombay Shapphire','London Dry Gin, Alc.40%',4800,25,'licores',['./static/img/products/bombay-saphire.webp'])
// productManager.addProduct('Chimay Bleu','Peres Trappistes, hecho en Bélgica, Alc. 9%', 2400, 25,'cervezas',['./static/img/products/Chimay bleu.jpg'])
// productManager.addProduct('Cerveza Ciney','Cerveza Belga Blonde, Alc.10%',2420,25,'cervezas',['./static/img/products/ciney-blonde.jpg'])
// productManager.addProduct('Lindemans Kriek Cherry','Cerveza Lambic, sabor cereza, Hecha en Bélgica',2600, 25,'cervezas',['./static/img/products/Lindemans_Kriek_BottleGlass_website_2022-1.png'])
// productManager.addProduct('Delirium Tremens Blonde','Cerveza Rubia, Hecha en Bélgica, Alc. 8,5%',2400, 25,'cervezas',['./static/img/products/delirium-tremens-blonde.jpg'])
// productManager.addProduct('El Profeta','Ginebra, Industria Argentina, Alc. 40%',2400,25,'vino',['./static/img/products/ginebra-el-profeta-750-ml.jpg'])
// productManager.addProduct('Luca Old Vine Malbec','Uco Valley ',3100, 25,'vino',['./static/img/products/luca-malbec.png'])
// productManager.addProduct('Zarapaca XO','Gran Reserva Especial, Solera, Hecho en Guatamala',7800,25,'licores',['./static/img/products/ron-zaracapa-xo.webp'])
// productManager.addProduct('Rutini Malbec','Mendoza, alc. 18% ',2790, 25,'licores',['./static/img/products/rutini-malbec-2021.png'])
// productManager.addProduct(' Santa Teresa 1796','Ron Venezolano Extra Añejo, Alc.40%',7000,25,'licores',['./static/img/products/santa-teresa-1796.jpg'])
// productManager.addProduct('El Enemigo, Malbec','Mendoza. Año 2021',3560,25,'vino',['./static/img/products/vino-el-enemigo-malbec-botella-750ml-a582a8a18e.webp'])

apiRouter.get('api/products/', async (req, res, next) => {
    try {
        const products = await productManager.getProducts()
        res.json(products)
    } catch (error) {
        next(error)
    }
})
apiRouter.get('api/products/:pid', async (req, res, next) => {
    try {
        const product = await productManager.getProductsById(req.params.pid)
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

apiRouter.post('/api/carts/', async (req,res,next)=>{
    try{
        const newCart = new Cart()
        res.json(newCart)
    }catch(error){
        next(error)
    }
})

apiRouter.get('api/carts/:cid', async (req, res, next) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid)
        res.json(cart.products)
    } catch (error) {
        next(error)
    }
})

apiRouter.post('/api/carts/:cid/product/:pid', async (req,res,next)=>{
    try{
        addedProduct = await cartManager.addToCart(req.params.cid, req.params.pid,productManager.getProductsById(req.params.pid))
        res.json(addedProduct)
    }catch(error){
        next(error)
    }
})

