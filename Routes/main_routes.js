const express = require('express')
const router = express.Router()
const config = require('../config.json')
const env = require('../var')

const themes = require(`../Themes/${config.theme}/theme.js`)


router.get('/', (req, res) => {
    res.render(themes.view_path + '.ejs' , {
        title: 'Test',
        theme_header: themes.header,
        dirname: env.dirname, 
    })
})

module.exports = router