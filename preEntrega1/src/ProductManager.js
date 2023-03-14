import fs from 'fs/promises'
import {Product} from "./Product"

export class ProductManager {
    #products
    #path

    constructor(path) {
        this.#path = path
        this.#products
         = []
    }

    async #loadProducts() {
        const json = await fs.readFile(this.#path, 'utf-8')
        this.#products
         = JSON.parse(json)
    }

    async #unloadProducts() {
        const newJson = JSON.stringify(this.#products
            , null, 2)
        await fs.writeFile(this.#path, newJson)
    }



    async addProduct(title, description, price, stock,category, thumbnail){
       const product = null
       
        try{
            await this.#loadProducts()
            if(this.#products.lenght === 0){
                product = new Product (1, title, description, randomUUID(), price, true, stock, category, thumbnail)
                this.#products.push(product)     
            }else if(this.#products.some((product)=> product.title===title||this.#products.some((product)=> product.id===id))){
                throw new Error ('producto ya existe')  
              }else{
                product = new Product (this.#products.lenght+1, title, description, randomUUID(), price, true, stock, category, thumbnail)
              }
            this.#unloadProducts() 
        }catch(error){ console.log(error)}
       
    }

    async getProducts() {
        await this.#loadProducts()
        return this.#products
        
    }

    async getProductsById(id) {
        await this.#loadProducts()
        const searched = this.#products
        .find(product => product.id === id)
        if (!searched) {
            throw new Error('product not found')
        }
        return searched
    }

    async updateProduct(id, newProduct) {
        await this.#loadProducts()
        const indexSearched = this.#products
        .findIndex(product => product.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        this.#products
        [indexSearched] = newProduct
        await this.#unloadProducts()
        return newProduct
    }

    async deleteProductById(id) {
        await this.#loadProducts()
        const indexSearched = this.#products
        .findIndex(product => product.id === id)
        if (indexSearched === -1) {
            throw new Error('product not found')
        }
        const [deleted] = this.#products
        .splice(indexSearched, 1)
        await this.#unloadProducts()
        return deleted
    }

    async reset() {
        this.#products
         = []
        await this.#unloadProducts()
    }
}

