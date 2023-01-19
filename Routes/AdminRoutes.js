const express = require('express')
const router = express.Router()
const AdminControllers = require('../Controllers/AdminControllers')



router.get('/',AdminControllers.admin )

router.get('/page', AdminControllers.page)

module.exports = router