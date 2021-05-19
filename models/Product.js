import { db } from '../DB/db.js'
class Product {
    constructor() {
    }

    get = async (id) => {
        try {
            if(!id) return db.from('products').select()
            return db.from('products').where('id', id)
        }
        catch(err) {
            console.log(err.sqlMessage)
        }
    }

    add = async (product) => {
        try {
            if(product.title === undefined) {
                return({
                    error: "debe completar un título para su artículo"
                })
            }
            if(product.price === undefined) {
                return({
                    error: "debe completar un precio para su artículo"
                })
            }
            if(product.thumbnail === undefined) {
                return({
                    error: "debe completar un thumbnail para su artículo"
                })
            }
            // esto lo mantengo solo para el env de prueba
            product.thumbnail = "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png"
            
            await db.from('products').insert(product)
            return product
        }
        catch(err) {
            console.log(err.sqlMessage)
        }
    }

    update = async (data, id) => {
        try {
            await db.from('products').where({ id: id }).update(data)
            return await this.get(id);
        }
        catch(err) {
            console.log(err.sqlMessage)
        }
    }

    delete = async (id) => {
        try {
            const deleted = await this.get(id)
            await db.from('products').where({ id: id }).del()
            return deleted
        }
        catch(err) {
            console.log(err.sqlMessage)
        }
    }
}

export default new Product();