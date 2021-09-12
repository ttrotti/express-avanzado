import Product from '../models/Product.js'
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

let schema = buildSchema(`
    type Query {
        productos: [Producto],
        producto(id: String): Producto
    },
    type Mutation {
        updateProductoPrice(id: String, price: Int): Producto,
        postProducto(
            title: String,
            thumbnail: String,
            price: Int
        ): Producto
    },
    type Producto {
        id: String,
        title: String,
        thumbnail: String,
        price: Int
    }
`)

let getProductos = async () => {
    return await Product.get()
}

let getProducto = async args => {
    return await Product.get(args.id)
}

let updateProductoPrice = async args => {
    return await Product.update(args.price, args.id)
}

let postProducto = async args => {
    return await Product.add(args, args.id)
}

let root = {
    productos: getProductos,
    producto: getProducto,
    updateProductoPrice,
    postProducto
}

export default graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
});