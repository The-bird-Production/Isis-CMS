const express = require('express')
const router = express.Router()
const config = require('../../config.json')
const env = require('../../var')
const PluginInfo = require('./blog.json')
const Controllers = require(PluginInfo.controllerPath)




router.get('/', (req,res) => {
    res.redirect('/blog/all')
   
})

router.get('/all', Controllers.all)

router.get('/:categorie', Controllers.view_categorie)
router.get('/article/:articleurl', Controllers.view_article)

module.exports = {
    router: router,
    route: PluginInfo.route,
    info: PluginInfo,
  };

