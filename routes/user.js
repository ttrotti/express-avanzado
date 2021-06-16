import express from 'express';
import userController from '../controllers/userController.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/login', userController.showLogin);
router.post('/login', userController.login)

router.get('/logout', userController.logout)


export default router;