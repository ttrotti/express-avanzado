import express from 'express';
import productRouter from './routes/products.js'
import Product from './models/Product.js'
import Message from './models/Message.js'
import frontRouter from './routes/front.js'
import exphbs from 'express-handlebars'
import cors from 'cors'
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import connection from './DB/db.js'

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

io.on('connection', async (socket) => {
    const products = await Product.get()
    const messages = await Message.get()
    console.log("Usuario conectado");
    socket.emit('messages', messages)
    socket.emit('products', products)
    
    socket.on('new-product', async (newProduct) => {
        await Product.add(newProduct);
        io.sockets.emit('products', await Product.get());
    })
    socket.on('new-message', async (newMessage) => {
        await Message.add(newMessage);
        io.sockets.emit('messages', await Message.get());
    })
});

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