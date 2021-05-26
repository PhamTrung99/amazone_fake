

class accountCon {
    getRegister(req, res) {
        res.render('accounts/register', {
            layout: false
        })
    }
    getLogin(req, res) {
        res.render('accounts/login', {
            layout: false
        })
    }
}

module.exports = new accountCon();