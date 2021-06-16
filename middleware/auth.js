export const auth = (req, res, next) => {
    if(req.session && req.session.username) return next()
    else return res.redirect('/login')
}