import express from 'express';
import prodController from '../controllers/prodController.js'
const router = express.Router();

router.get('/', prodController.get);
router.post('/', prodController.add);
router.get('/:id', prodController.getById);
router.put('/:id', prodController.update);
router.delete('/:id', prodController.delete);


export default router;