export class Cart {
    constructor({ id, products}) {
        if (!products) throw new Error('falta un argumento')       
        this.id = id
        this.products = products
       
    }
}