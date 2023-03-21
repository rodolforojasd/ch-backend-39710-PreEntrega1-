import { randomUUID } from 'crypto'
export class Product {
    constructor( id, title, description, code, price, status, stock, category, thumbnail) {
       
        if (!title) throw new Error('falta un argumento title')
        if (!description) throw new Error('falta un argumento')
        if(Number.isNaN(price)||!price) throw new Error('falta un argumento price o es un tipo invalido')
        if(Number.isNaN(stock)||!stock) throw new Error('falta un argumento stock o es un tipo invalido')
        if (!category) throw new Error('falta el argumento category')
        if (thumbnail.length === 0) throw new Error('falta un argumento thumbnail')

        this.id = id
        this.title = title
        this.description = description
        this.code = code
        this.price= price
        this.status=status
        this.stock = stock
        this.category=category
        this.thumbnail=thumbnail

    }
}