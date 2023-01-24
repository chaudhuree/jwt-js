const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

//middleware to check if user is logged in
const authMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authMiddleware, dashboard)
router.route('/login').post(login)

module.exports = router
