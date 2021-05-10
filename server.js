"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var products_js_1 = __importDefault(require("./routes/products.js"));
var front_js_1 = __importDefault(require("./routes/front.js"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express_1["default"]();
var httpServer = new http_1.Server(app);
var io = new socket_io_1.Server(httpServer);
var messages = [];
var productos = [];
io.on('connection', function (socket) {
    console.log("Usuario conectado");
    socket.emit('messages', messages);
    socket.emit('productos', productos);
    socket.on('new-product', function (newProduct) {
        productos.push(newProduct);
        io.sockets.emit('productos', productos);
    });
    socket.on('new-message', function (newMessage) {
        messages.push(newMessage);
        io.sockets.emit('messages', messages);
    });
});
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(cors_1["default"]());
app.use(express_1["default"].static("public"));
app.use('/api/productos', products_js_1["default"]);
app.use('/productos', front_js_1["default"]);
app.engine('hbs', express_handlebars_1["default"]({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', "./views");
var PORT = 8080;
var server = httpServer.listen(PORT, function () {
    console.log("Servidor escuchando en el puerto " + PORT);
});
server.on('error', function (err) { return console.log("Error message:" + err); });
