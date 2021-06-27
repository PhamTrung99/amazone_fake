const User = require('../Model/Cassandra/user.cassandra');
const bcrypt = require('bcryptjs');

const SALT = 10;

class accountCon {

    getLogin(req, res) {
        res.render('accounts/login', {
            layout: false
        })
    }

    async checkAccount (req, res) {
        const result = {
            existEmail: true,
            correct_password: false
        }
        const user = await User.getUserByEmail(req.body.email);
        if (Object.keys(user).length === 0) {
            result.existEmail = false;
        } else {
            const isCorrectPass = bcrypt.compareSync(req.body.password, user.password);
            if (isCorrectPass === true) {
                result.correct_password = true;
            }
        }
        res.status(200).json(result);
    }

    async postLogin (req, res) {
        const user = await User.getUserByEmail(req.body.email);
        if (user.role === 1 && user.status === 1) {
            req.session.isAuth = true;
            res.status(200).json({role: 1});
        } else 
            if (user.role === 0 && user.status){
            req.session.isAuthAdmin = true;
            res.status(200).json({role: 0});
        }
        req.session.authUser = user;
    }

    getRegister(req, res) {
        res.render('accounts/register', {
            layout: false
        })
    }

    async isExistEmail(req, res) {
        const email = req.params.email;
        console.time('start: ')
        const data = await User.getUserByEmail(email);
        console.timeEnd('start: ');
        if (Object.keys(data).length === 0) {
            res.json({isExist: false})
        } else {
            res.json({
                isExist: true,
                user: data
            })
        }
    }

    async postRegister(req, res) {
        req.body.password = bcrypt.hashSync(req.body.password, SALT);
        let user = await User.createUser(req.body);
        res.status(200).json({});
    }

    postLogout( req, res) {
        req.session.authUser = null;
        if(req.session.isAuthAdmin) {
            req.session.isAuthAdmin = false;
            res.redirect('/account/login');
        } else {
            req.session.isAuth = false;
            return res.redirect('/account/login'); 
        }
    }
        
}

module.exports = new accountCon();