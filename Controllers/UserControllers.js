const db = require('../System/db')
const bcrypt = require('bcrypt')
const session = require('../config/session')


exports.connect = (req, res ) => {
    



}

exports.create = (req, res ) => {

    bcrypt.hash(req.body.password, session.saltRounds, (err, hash) => {
        if (err ) {}
       let data = {
        email: req.body.data,
        username: req.body.username,
        password: hash
       }
    })



}