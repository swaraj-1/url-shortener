const express = require('express');
const { handleUserSignUp, handleUserLogIn, handleUserLogOut } = require('../controllers/user');

const router = express.Router()

// Sign-Up Route

router.post('/', handleUserSignUp)
router.post('/login', handleUserLogIn)

// Logout Route

router.get('/logout', handleUserLogOut)



module.exports = router;