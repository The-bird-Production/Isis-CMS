const express = require('express')
const router = express.Router()
const AdminControllers = require('../Controllers/AdminControllers')


router.get('/',AdminControllers.admin )

module.exports = router