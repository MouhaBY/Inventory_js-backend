const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/User')
const auth = require('../middlewares/auth')


router.get('/all', auth, userCtrl.getAllUsers)
router.post('/signup', auth, userCtrl.signup)
router.post('/login', auth, userCtrl.login)
router.get('/user/:id', auth, userCtrl.getOneUser)
router.put('/user/:id', auth, userCtrl.modifyUser)
router.delete('/user/:id', auth, userCtrl.deleteUser)

module.exports = router