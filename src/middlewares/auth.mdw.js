module.exports = {
    auth(req, res, next) {
        if (!req.session.isAuth || req.session.isAuth === false) {
            req.session.retUrl = req.originalUrl;
            return res.redirect('/account/login');
        }

        next();
    },

    authAdmin(req, res, next) {
        if (!req.session.isAuthAdmin || req.session.isAuthAdmin === false) {
            req.session.retUrl = req.originalUrl;
            return res.redirect('/account/login');
        }
        next();
    },

};