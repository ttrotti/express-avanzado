import express from 'express';
import productRouter from './routes/products.js'
import frontRouter from './routes/front.js'
import cors from 'cors'

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(express.static("views"))

app.use('/api/producto', productRouter)
app.use('/', frontRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on('error', err => console.log("Error message:" + err))