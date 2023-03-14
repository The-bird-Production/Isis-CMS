const db = require('../system/db')
const bcrypt = require('bcrypt')
const session = require('../config/session')



exports.connect = (req, res ) => {

    if (req.body.email) {
        let SQL = `SELECT * FROM user WHERE email="${req.body.email}" `
        db.query(SQL, (err, result) => {
            if (err) {
                console.log('NEW DATABASE ERROR USERCONTROLLER: ' + err)

            }
            if (result) {
                const formi = JSON.stringify(result)
                const reformed = JSON.parse(formi)
                const formed = reformed[0]
              
               
                bcrypt.compare(req.body.password, formed.password, (err, isMatch) => {
                    if (err) {
                        console.log('USER CONTROLLER HASH ERROR: ' + err )
                        
                    }
                    if (isMatch) {
                        req.session.regenerate((err) => {
                            // Gérez les erreurs si nécessaire
                            if (err) {
                              console.error(err);
                              return res.status(500).send('Erreur de serveur');
                            }
                            req.session.userID = formed.id
                        req.session.username = formed.username
                        req.session.email = formed.email
                        req.session.role = formed.role
                        req.session.isLoged = true
                       
                        res.redirect('/profil')
                        
                        })
                        
                        
                        

                        
                    }
                })
            }
        })

    }

    if (req.body.username) {

    }
    



}

exports.create = (req, res ) => {

    bcrypt.hash(req.body.password, session.saltRounds, (err, hash) => {
        if (err) {}
       let data = {
        email: req.body.email,
        username: req.body.username,
        password: hash
       }
       console.log(data)
       let SQL = `SELECT * FROM user WHERE email="${data.email}"`
       db.query(SQL, (err, result) => {
        let formi = JSON.stringify(result)
        let formed = JSON.parse(formi)
        if (data.email === formed.email) {
            
        } else {
            db.query('INSERT INTO user SET ? ', data , (error, resultat) => {
                if (error) {
                    console.log('NEW DATABASE ERROR : ' + error)
                }
                if (resultat) {
                    res.redirect('/user/login')
                }
            })
        }
       })
    })



}