import express from 'express';
import userController from '../controllers/userController.js'
import passport from 'passport'

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


export default router;