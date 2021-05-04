import express from 'express';
import productRouter from './routes/products.js'
import product from './controllers/prodController.js'
import frontRouter from './routes/front.js'
import exphbs from 'express-handlebars'
import cors from 'cors'
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

io.on('connection', (socket) => {
    console.log("Usuario conectado");
    const productos = product.get()
    io.sockets.emit('productos', productos)
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static("public"));
app.use('/api/productos', productRouter)
app.use('/productos', frontRouter)

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', "./views")

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on('error', err => console.log("Error message:" + err))