const  express = require('express')
const router = express.Router()
const PluginInfo = require('../blog.json')
const securite = require('../../../System/RoleCheking')
const Controller = require(PluginInfo.admin_controllerPath)

router.get('/', securite, Controller.view)
router.get('/publish', securite, Controller.publish)
router.post('/publish/send', securite, Controller.publish_send)
router.get('/categorie/:info', securite, Controller.categorie_gestion)


module.exports = {
    router: router,
    route: PluginInfo.route,
    info: PluginInfo,
  };