const express = require('express');
const router = express.Router();
const pluginInfo = require('../testplugin.json');

const controller = require(pluginInfo.admin_controllerPath);

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = {
  router: router,
  route: pluginInfo.route,
  info: pluginInfo
};