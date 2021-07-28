import nodemailer from 'nodemailer'
import {User} from '../server.es6.js'

//EMAILS

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'cordell36@ethereal.email',
        pass: 'vz4PfkfHY5zQqtWeVm'
    }
});

const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

const sendEmail = async (username, action) => {
    await User.findOne({username: username}, (err, docs) => {
        if(err) {
            console.log(err)
        } else {
            const mailOptions = {
                from: 'Servidor Node.js',
                to: `${docs.email}`,
                subject: `${action} a nuestra web`,
                html: `<h1>Hola ${docs.firstName}</h1><br><p>Te logeaste a nuestra app el ${new Date()}</p>`
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err)
                    return err
                }
            }) 
            gmailTransporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err)
                    return err
                }
            }) 
        }
    });
}

// CONTROLLER

class userController {

    showLogin(req, res) {
        if(!req.session.username) return res.render('login.hbs')
        else return res.redirect('/productos/input')
    }

    async login(req, res) {
        const username = req.body.username;
        if(!username) {
            return res.render('login', {failed: true, failMsg: 'Invalid field input, try again'})
        }
        req.session.password = req.body.password
        req.session.username = username

        sendEmail(username, 'Log In')
        return res.redirect('/productos/input')
    }

    async signup(req, res) {
        const username = req.body.username;
        if(!username) {
            return res.render('login', {failed: true, failMsg: 'Invalid field input, try again'})
        }
        req.session.password = req.body.password
        req.session.username = username
        sendEmail(username, 'Sign Up')
        return res.redirect('/productos/input')
    }

    logout(req, res) {
        const username = req.session.username;
        req.session.destroy();
        sendEmail(username, 'Log Out')
        res.render('login', {logout: true})
    }

    showFailure(req, res) {
        return res.render('login', {failed: true, failMsg: 'Invalid field input, try again'})
    }
}

export default new userController();