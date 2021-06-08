import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    }
})

const products = mongoose.model('productos', productSchema);

class Product {
    constructor() {
    }

    get = async (id) => {
        try {
            if(!id) return products.find({})
            return products.findById(id)
        }
        catch(err) {
            console.log(err)
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
            
            await products(product).save()
            return product
        }
        catch(err) {
            console.log(err)
        }
    }

    update = async (data, id) => {
        try {
            await products.updateOne({_id: id}, data)
            return await this.get(id);
        }
        catch(err) {
            console.log(err)
        }
    }

    delete = async (id) => {
        try {
            const deleted = await this.get(id)
            await products.deleteOne({_id: id})
            return deleted
        }
        catch(err) {
            console.log(err)
        }
    }
}

export default new Product();