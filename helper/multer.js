const multer = require('multer');
const stroage = multer.diskStorage({})
const path = require('path')

const upload = multer({
    stroage: stroage
})

module.exports=upload