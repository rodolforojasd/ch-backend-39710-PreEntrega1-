import fs from 'fs/promises'
import {Cart} from './Cart'

export class CartManager {
    #carts
    #path

    constructor(path) {
        this.#path = path
        this.#carts = []
    }

    
    async #loadCarts() {
        const json = await fs.readFile(this.#path, 'utf-8')
        this.#carts = JSON.parse(json)
    }

    async #unloadCarts() {
        const newJson = JSON.stringify(this.#carts, null, 2)
        await fs.writeFile(this.#path, newJson)
        
    }

    async getCarts() {
        await this.#loadCarts()
        return this.#carts
    }

    async addCart(id,products=[]) {
        const newCart = {}
        try{
            await this.#loadCarts()
            if(this.#products.lenght === 0){
                newCart =  new Cart (1,products)
                this.#carts.push(newCart)
            }else{
                newCart =  new Cart (this.#carts.lenght+1,products)
                this.#carts.push(newCart)
            }
            await this.#unloadCarts()
        }catch(error){console.log(error)}
        
    }

    
    async getCartById(id) {
        await this.#loadCarts()
        const searched = this.#carts.find(c => c.id === id)
        if (!searched) {
            throw new Error('id no encontrado')
        }
        return searched
    }

    async addToCart(cartId,productId,getProductById){
      const cart = await this.getCartById(cartId)
      const productToAdd = await getProductById(productId)
     try{
        if(cart.quantity===0){
            const cartProduct= {id:productToAdd.id,quantity:1, price:productToAdd.price }
          }else{
            const cartProduct= {id:productToAdd.id,quantity:quantity+1, price:productToAdd.price }
          }
          cart.products.push(cartProduct)
          this.updateCart(cartId,cart)
     }catch(error){console.log(error)}

    }

    
    async deleteCartById(id) {
        await this.#loadCarts()
        const indexSearched = this.#carts
        .findIndex(c => c.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        const [deleted] = this.#carts
        .splice(indexSearched, 1)
        await this.#unloadCarts()
        return deleted
    }

    async updateCart(id, newCart) {
        await this.#loadCarts()
        const indexSearched = this.#carts
        .findIndex(c => c.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.#carts
        [indexSearched] = newCart
        await this.#unloadCarts()
        return newCart
    }

    async deleteCartProductById(cartId,productId) {
        await this.#loadCarts()
        const cart = this.getCartById(cartId)
        const indexSearched = cart.products
        .findIndex(product => product.id === productId)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        const newCart = cart.products
        .splice(indexSearched, 1)

        updateCart(cartId, newCart)        
    }

    async reset() {
        this.#carts = []
        await this.#unloadCarts()
    }
}