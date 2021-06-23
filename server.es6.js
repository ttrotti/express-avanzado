import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose';
import exphbs from 'express-handlebars'
import cors from 'cors'

import productRouter from './routes/products.js'
import userRouter from './routes/user.js'
import frontRouter from './routes/front.js'

import connection from './DB/db.js'
import Product from './models/Product.js'
import Message from './models/Message.js'

import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config()

import bCrypt from 'bcrypt'
import passport from 'passport'
import passportLocal from 'passport-local'

// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIESECRET))
app.use(session({
    store: MongoStore.create({  
        mongoUrl: `${process.env.MONGO_URI}`, 
        ttl: 600
    }),
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(cors());

app.use(express.static("public"));
app.use('/api/productos', productRouter)
app.use('/productos', frontRouter)
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

// USER SCHEMA

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
})
const User = mongoose.model('usuarios', userSchema);

// PASSPORT
const LocalStrategy = passportLocal.Strategy

const isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password)
}

const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        User.findOne({ 'username': username },
            function(err, user) {
                if(err)
                    return done(err);
                if(!user) {
                    console.log('User not found with username '+username);
                    return done(null, false,
                        console.log('error:', 'User not found.'));
            }

                if(!isValidPassword(user, password)){
                    console.log('Invalid Password');
                    return done(null, false,
                        console.log('error:', 'Invalid Password'));
                }

                return done(null, user)
            }
        )
    }
));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
    },
    function(req, username, password, done) {
        const findOrCreateUser = function() {
            User.findOne({'username': username}, function(err, user) {
                if(err){
                    console.log('Error in SignUp: '+err);
                    return done(err)
                }
                if(user) {
                    console.log('User Already Exists');
                    return done(null, false, 
                        console.log('message', 'User already exists'));
                } else {
                    let newUser = new User();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.body.email;
                    newUser.firstName = req.body.firstName;
                    newUser.lastName = req.body.lastName;

                    newUser.save(function(err){
                        if(err){
                            console.log('Error in Saving user: '+err);
                            return done(err)
                        }
                        console.log('User registration succesful');
                        return done(null, newUser)
                    });
                }
            });
        }
        process.nextTick(findOrCreateUser);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user)
    })
})

// SERVER
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on('error', err => console.log("Error message:" + err))