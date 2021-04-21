import express from 'express';
import product from './controllers/prodController.js'
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/productos', (req, res) => {
    const data = product.get()
    if(!data) {
        return res.status(404).json({
            error: "no hay productos cargados"
        })
    }

    res.json(data);
});

app.post('/productos', (req, res) => {
    const data = req.body;
    const newData = product.add(data);
    if(newData.error) {
        return res.status(401).json(newData.error)
    }
    res.status(201).json(newData);
});

app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const filteredProduct = product.getById(id);
    if(!filteredProduct) {
        return res.status(404).json({
            error: "producto no encontrado"
        })
    }
    res.json(filteredProduct);
});

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on('error', err => console.log("Error message:" + err))