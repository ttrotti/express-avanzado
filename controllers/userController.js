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
        return res.redirect('/productos/input')
    }

    async signup(req, res) {
        const username = req.body.username;
        if(!username) {
            return res.render('login', {failed: true, failMsg: 'Invalid field input, try again'})
        }
        req.session.password = req.body.password
        req.session.username = username
        return res.redirect('/productos/input')
    }

    logout(req, res) {
        req.session.destroy();
        res.render('login', {logout: true})
    }

    showFailure(req, res) {
        return res.render('login', {failed: true, failMsg: 'Invalid field input, try again'})
    }
}

export default new userController();