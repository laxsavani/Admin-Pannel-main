const express = require('express');
const router = express.Router();
const {
    register,
    login,
    registerPost,
    loginPost,
    home,
    product,
    cart,
} = require('../controller/usercontroller')

router.get('/register', register)
router.post('/register', registerPost)
router.get('/login', login)
router.post('/login', loginPost)

router.get('/home', home)
router.get('/product', product)
router.get('/cart', cart)

module.exports = router