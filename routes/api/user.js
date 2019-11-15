const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('../../passport')

router.post('/', (req, res) => {
    console.log(res);

    // const { username, password } = req.body
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    console.log(username, password, email)
    // ADD VALIDATION

    if (email == undefined) {
        res.redirect("/signup");
    } else {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('User.js post error: ', err)
            } else if (user) {
                res.json({
                    error: `Sorry, already a user with the username: ${username}`
                })
            }
            else {
                const newUser = new User({
                    username: username,
                    password: password,
                    email: email,
                    money_made: 0
                })
                newUser.save((err, savedUser) => {
                    if (err) return res.json(err)
                    res.json(savedUser)
                })
            }
        })
    }
})

router.post(
    '/login',
    function (req, res, next) {
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        var userInfo = {
            username: req.user.username,
            money_made: req.user.money_made
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    username = req.user.username;
    User.findOne({ username: username }, (err, user) => {
        if (req.user) {
            res.json({ user: user })
        } else {
            res.json({ user: null })
        }
    });
});

router.get('/:sellerId', (req, res) => {
    User.findOne({ _id: req.params.sellerId }, (err, user) => {
        res.json({ money_made: user.money_made });
    });
});

router.put('/:sellerId', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.sellerId }, {money_made: req.body.money_made}, { new: true })
    .then(dbUpdate => {
        res.json(dbUpdate)
    })
    .catch(err => res.status(400).json(err));
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router