class userController {

    showLogin(req, res) {
        if(!req.session.username) return res.render('login.hbs')
        else return res.redirect('/productos/input')
    }

    async login(req, res) {
        const username = req.body.username;
        if(!username) {
            return res.render('login', {failed: true})
        }
        req.session.username = req.body.username
        return res.redirect('/productos/input')
    }

    logout(req, res) {
        req.session.destroy();
        res.render('login', {logout: true})
    }
}

export default new userController();