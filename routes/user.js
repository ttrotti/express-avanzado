import express from 'express';
import userController from '../controllers/userController.js'
import passport from 'passport'
import { fork } from 'child_process'

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/prodcutos/input',
        failureRedirect: '/fail'
    }))

router.get('/login', userController.showLogin);

router.post('/login', passport.authenticate('login', {failureRedirect: '/fail'}) , userController.login)

router.get('/signup', (req, res) => {
    res.redirect('/login')
})
router.post('/signup', passport.authenticate('signup', {failureRedirect: '/fail'}), userController.signup)


router.get('/fail', userController.showFailure)

router.get('/logout', userController.logout)

const enviroment = JSON.stringify(process.env, null, "\t")
const memoryUsage = JSON.stringify(process.memoryUsage(), null, "\t")
router.get('/info', async (req, res) => {
    res.render('info.hbs', {args: process.argv, directory: process.cwd(), processID: process.pid, version: process.version, processTitle: process.title, platform: process.platform, memoryUsage: memoryUsage, enviroment: enviroment})
})

router.get('/randoms', async (req, res) => {
    const cant = req.query.cant;
    const randoms = fork('./randoms.js')
    randoms.send('start')
    randoms.on('result', result => {
        res.json(result)
    })
})


export default router;