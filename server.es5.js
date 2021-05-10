'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('./routes/products.js');

var _products2 = _interopRequireDefault(_products);

var _front = require('./routes/front.js');

var _front2 = _interopRequireDefault(_front);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _http = require('http');

var _socket = require('socket.io');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var httpServer = new _http.Server(app);
var io = new _socket.Server(httpServer);

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

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)());
app.use(_express2.default.static("public"));
app.use('/api/productos', _products2.default);
app.use('/productos', _front2.default);

app.engine('hbs', (0, _expressHandlebars2.default)({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', "./views");

var PORT = 8080;
var server = httpServer.listen(PORT, function () {
    console.log('Servidor escuchando en el puerto ' + PORT);
});

server.on('error', function (err) {
    return console.log("Error message:" + err);
});
