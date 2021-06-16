import express from 'express';
import product from '../models/Product.js'
const router = express.Router();

router.get('/input', (req, res) => {
    res.render('index.hbs', {session: req.session, counter: req.session.counter})
});

router.post('/input', (req, res) => {
    product.add(req.body)
    res.render('index.hbs')
})

router.get('/vista', async (req, res) => {
    res.render('products/listado.hbs')
});

router.get('/vista-test', async (req, res) => {
    res.render('products/listado.hbs')
})

export default router;