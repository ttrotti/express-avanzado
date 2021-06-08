import Product from '../models/Product.js'
class ProductController {
    async add(req, res) {
        const data = req.body;
        const newData = await Product.add(data);
        if(newData.error) {
            return res.status(401).json(newData.error)
        }
        res.status(201).json(newData)
    }

    async get(req, res) {
        const data = await Product.get()
        if(!data) {
            return res.status(404).json({
                error: "no hay productos cargados"
            })
        }
        res.json(data);
    }

    async getById(req, res) {
        const { id } = req.params;
        const filteredProduct = await Product.get(id);
        if(!filteredProduct) {
            return res.status(404).json({
                error: "producto no encontrado"
            })
        }
        res.json(filteredProduct);
    }

    async update(req, res) {
        const data = req.body;
        const { id } = req.params;
        const updatedProduct = await Product.update(data, id)
        if(!updatedProduct) {
            return res.status(404).json({
                error: "producto no encontrado"
            })
        }
        res.json(updatedProduct);
    }

    async delete(req, res) {
        const { id } = req.params;
        const deletedProduct = await Product.delete(id)
        if(!deletedProduct) {
            return res.status(404).json({
                error: "producto no encontrado"
            })
        }
        res.json(deletedProduct);
    }

    async getFakes(req, res) {
        const cant = req.query.cant;
        const data = await Product.getFakes(cant)
        if(!data) {
            return res.status(404).json({
                error: "no hay productos cargados"
            })
        }
        res.json(data);
    }
}

export default new ProductController();