import express from 'express';
import productRouter from './routes/products.js'
import frontRouter from './routes/front.js'
import exphbs from 'express-handlebars'
import cors from 'cors'

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static("views"));
app.set('view engine', 'pug');

app.use('/api/productos', productRouter)
app.use('/productos', frontRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on('error', err => console.log("Error message:" + err))