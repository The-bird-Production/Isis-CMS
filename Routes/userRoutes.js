const express = require('express')
const router = express.Router()
const db = require('../System/db')

const config = require('../config.json')

const themes = require(`../Themes/${config.theme}/theme.js`)
const UserControllers = require('../Controllers/UserControllers')


//login
router.get('/login', (req, res) => {
    res.render(themes.login_path, {
        title: 'Isis CMS'
    })
    
})


router.post('/login', UserControllers.connect )

//create account 

router.get('/create', (req, res ) => {
    res.render(themes.create_path, {
        title: 'Isis CMS '
    })
})

router.post('/create', UserControllers.create)


module.exports = router