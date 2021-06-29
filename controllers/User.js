const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            password: hash,
            contactName : req.body.contactName,
        })
        user.save()
        .then(()=> res.status(200).json({message: 'user created'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({ username : req.body.username })
    .then(user => {
        if (!user){
            return res.status(401).json({error : 'user not found'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then( valid => {
            if (!valid){
                return res.status(401).json({error : 'password incorrect'})
            }
            res.status(200).json({
                userId : user._id,
                token : jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}