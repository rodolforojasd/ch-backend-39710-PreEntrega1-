import fs from 'fs/promises'
import {Cart} from './Cart.js'

export class CartManager {
    carts
    path

    constructor(path) {
        this.path = path
        this.carts = []
    }

    
    async loadCarts() {
        const json = await fs.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(json)
    }

    async unloadCarts() {
        const newJson = JSON.stringify(this.carts, null, 2)
        await fs.writeFile(this.path, newJson)
        
    }

    async getCarts() {
        await this.loadCarts()
        return this.carts
    }

     addCart() {

        try{
             this.loadCarts()
            if(this.carts.length === 0){
                const newCart =  new Cart (1,[])
                this.carts.push(newCart)
            }else{
                const newCart =  new Cart (this.carts.length + 1,[])
                this.carts.push(newCart)
            }
             this.unloadCarts()
        }catch(error){console.log(error)}
        
    }

    
    async getCartById(id) {
        await this.loadCarts()
        const searched = this.carts.find(c => c.id === id)
        if (!searched) {
            throw new Error('id no encontrado')
        }
        return searched
    }

    async addToCart(cartId,productId,pm){
        const newCart = await this.getCartById(cartId)
        const productToAdd = await pm.getProductById(productId)
        const cartProducts = newCart.products
        const inCart = cartProducts.findIndex(p => p.id === productId)
   
        try{
            if(inCart === -1){
                const newProduct= {id: productToAdd.id, quantity:1, price: productToAdd.price }
                newCart.products.push(newProduct)
                 
            }else{
                const newProduct= {id: productToAdd.id, quantity: newCart.products[index].quantity+1, price:productToAdd.price }
                newCart.products[inCart] = newProduct
            }
            
            this.updateCart(cartId, newCart)

        }catch(error){console.log(error)}

    }

    
    async deleteCartById(id) {
        await this.loadCarts()
        const indexSearched = this.carts.findIndex(c => c.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        const [deleted] = this.carts.splice(indexSearched, 1)
        await this.unloadCarts()
        return deleted
    }

    async updateCart(id, newCart) {
        await this.loadCarts()
        const indexSearched = this.carts.findIndex(c => c.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.carts[indexSearched] = newCart
        await this.unloadCarts()
        return newCart
    }

    async deleteCartProductById(cartId,productId) {
        await this.loadCarts()
        const cart = this.getCartById(cartId)
        const indexSearched = cart.products.findIndex(product => product.id === productId)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        const newCart = cart.products.splice(indexSearched, 1)

        this.updateCart(cartId, newCart)        
    }

    async reset() {
        this.carts = []
        await this.unloadCarts()
    }
}