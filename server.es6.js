import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import exphbs from 'express-handlebars'
import cors from 'cors'

import productRouter from './routes/products.js'
import userRouter from './routes/user.js'
import frontRouter from './routes/front.js'

import connection from './DB/db.js'
import Product from './models/Product.js'
import Message from './models/Message.js'

import {auth} from './middleware/auth.js'

import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser(process.env.COOKIESECRET))
app.use(session({
    store: MongoStore.create({  
    mongoUrl: `${process.env.MONGO_URI}`, 
    ttl: 10
}),
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static("public"));
app.use('/api/productos', productRouter)
app.use('/productos', auth, frontRouter)
app.use('/', userRouter)

// DB CONNECTION
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// SOCKET CONNECTION
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

io.on('connection', async (socket) => {
    const products = await Product.get()
    const testProducts = await Product.getFakes()
    const messages = await Message.get()
    console.log("Usuario conectado");

    // data requests
    socket.on('getMessages', () => {
        socket.emit('messages', messages)
    });

    socket.on('getProducts', () => {
        socket.emit('products', products)
    });

    socket.on('getTestProducts', () => {
        socket.emit('products', testProducts)
    });
    
    // data managment
    socket.on('new-product', async (newProduct) => {
        await Product.add(newProduct);
        io.sockets.emit('products', await Product.get());
    })
    socket.on('new-message', async (newMessage) => {
        await Message.add(newMessage);
        io.sockets.emit('messages', await Message.get());
    })
});

// VIEW ENGINE
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', "./views")

// SERVER
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on('error', err => console.log("Error message:" + err))