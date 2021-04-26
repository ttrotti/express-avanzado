import express from 'express';
import product from '../controllers/prodController.js'
import path from 'path';
const router = express.Router();

router.get('/', (req, res) => {
    const data = product.get()
    if(!data) {
        return res.status(404).json({
            error: "no hay productos cargados"
        })
    }
    res.sendFile(path.resolve('views/index.html'))
});


export default router;