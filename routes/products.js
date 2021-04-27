import express from 'express';
import product from '../controllers/prodController.js'
const router = express.Router();

router.get('/', (req, res) => {
    const data = product.get()
    if(!data) {
        return res.status(404).json({
            error: "no hay productos cargados"
        })
    }
    res.json(data);
});

router.post('/', (req, res) => {
    const data = req.body;
    const newData = product.add(data);
    if(newData.error) {
        return res.status(401).json(newData.error)
    }
    res.status(201).json(newData)
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const filteredProduct = product.getById(id);
    if(!filteredProduct) {
        return res.status(404).json({
            error: "producto no encontrado"
        })
    }
    res.json(filteredProduct);
});

router.put('/:id', (req, res) => {
    const data = req.body;
    const { id } = req.params;
    const updatedProduct = product.update(data, id)
    if(!updatedProduct) {
        return res.status(404).json({
            error: "producto no encontrado"
        })
    }
    res.json(updatedProduct);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deletedProduct = product.delete(id)
    if(!deletedProduct) {
        return res.status(404).json({
            error: "producto no encontrado"
        })
    }
    res.json(deletedProduct);
});


export default router;