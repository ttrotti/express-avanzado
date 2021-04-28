import express from 'express';
import product from '../controllers/prodController.js'
const router = express.Router();

router.get('/input', (req, res) => {
    res.render('index.ejs')
});

router.get('/vista', (req, res) => {
    const data = product.get();
    if(!data) return res.status('404').render('products/listado')
    res.render('products/listado', {products: data})
});

export default router;