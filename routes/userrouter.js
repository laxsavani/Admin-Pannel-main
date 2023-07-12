const express = require('express');
const router = express.Router();
const {
    home,
    formElenents,
    tableGeneral,
    profile,
    register,
    login,
    faq,
    registerPost,
    loginPost,
    update,
    updatePost,
    deletes
} = require('../controller/usercontroller')

router.get('/', home)
router.get('/formElenents', formElenents)
router.get('/tableGeneral', tableGeneral)
router.get('/profile', profile)
router.get('/register', register)
router.post('/register', registerPost)
router.get('/login', login)
router.post('/login', loginPost)
router.get('/faq', faq)
router.get('/update/:id', update)
router.post('/update/:id', updatePost)
router.get('/delete/:id', deletes)


module.exports = router