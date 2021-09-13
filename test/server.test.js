import supertest from 'supertest';
import { expect } from 'chai';
import Product from '../models/Product.js'

const request = supertest('http://localhost:8080');

describe('test api productos', () => {
    describe('GET', () => {
        it('deberia devolver un status 200', async () => {
            let response = await request.get('/api/productos');
            expect(response.status).to.eql(200)
        })
    });

    describe('POST', () => {
        it('deberia incorporar un nuevo producto', async () => {
            let newProducto = await Product.getFakes(1);
            newProducto = newProducto[0]
            newProducto._id = "613e97e62090874b719fe30a";

            let response = await request.post('/api/productos').send(newProducto);

            expect(response.status).to.eql(201);

            const producto = response.body;
            expect(producto).to.include.keys('title', 'price', 'thumbnail');

            expect(producto.title).to.eql(newProducto.title);
            expect(producto.price).to.eql(newProducto.price);
            // expect(producto.thumbnail).to.eql(newProducto.thumbnail);
            // no incluido porque se reemplaza en el Post del modelo
        })
    });

    describe('UPDATE', () => {
        it('deberia modificar el precio de un producto', async () => {
            const id = "613e97e62090874b719fe30a"
            const newPrice = "400";

            let data = await request.get(`/api/productos/${id}`);
            data.price = newPrice;
            // modificar para que coincida con algún producto en la bbdd

            let response = await request.put(`/api/productos/${id}`).send(data);

            expect(response.status).to.eql(200);

            const producto = response.body;

            expect(producto.price).to.eql(price);
        })
    });

    describe('DELETE', () => {
        it('deberia borrar un producto', async () => {
            // modificar para que coincida con algún producto en la bbdd
            const id = "613e97e62090874b719fe30a"

            let response = await request.delete(`/api/productos/${id}`);

            expect(response.status).to.eql(200);

            const producto = response.body;

            expect(producto._id).to.eql(id);
        })
    });
})