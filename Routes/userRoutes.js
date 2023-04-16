const express = require('express')
const router = express.Router()
const db = require('../System/db')
const env = require('../var')

const config = require('../config.json')

const themes = require(`../Themes/${config.theme}/theme.js`)
const UserControllers = require('../Controllers/UserControllers')
const multler = require('multer')

const upload = multler({dest: env.dirname + '/public/upload/image/pp/'})


router.get('/profil',  async (req,res) => {
    if (req.session.isLoged === true) {
        if (!themes.profil) {
            res.render(env.dirname + '/App/profil',  {
                req: req
    
            })
    
        } else {
            res.render(themes.profil, {
                theme_header : themes.header, 
                req: req
            })

        }
        

    } else {
        res.redirect('/user/login')
    }
   



})



//login
router.get('/login', (req, res) => {
    res.render(themes.login_path, {
        title: 'Isis CMS',
        theme_header : themes.header,
        })
    
})


router.post('/login', UserControllers.connect )

//create account 

router.get('/create', (req, res ) => {
    res.render(themes.create_path, {
        title: 'Isis CMS ',
        theme_header : themes.header,
    })
})

router.post('/create', UserControllers.create)


//Modify

router.post('/modify/pasword', UserControllers.password_modify)
router.post('/modify/pp', upload.single("file"), UserControllers.pp_modify)
router.post('/modify/username', UserControllers.pseudo_modify)


module.exports = router