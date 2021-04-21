import express from 'express';
import productRouter from './routes/products.js'
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', productRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on('error', err => console.log("Error message:" + err))