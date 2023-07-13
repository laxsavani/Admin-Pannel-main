const express = require('express');
const router = express.Router();
const admin_token = require('../middleware/admin.middleware')
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
    deletes,
    mail
} = require('../controller/usercontroller')

router.get('/',admin_token, home)
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
router.get('/mail/:id', mail)


module.exports = router