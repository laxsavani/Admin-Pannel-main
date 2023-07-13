const express = require('express')
const path = require('path')
const port = 2000;
const flash = require('express-flash')
const session = require('express-session')

app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'assets')))
app.use(flash())

app.use(session({
    saveUninitialized: true,
    secret: 'secret',
    resave:false
}))

app.use('/admin', require('./routes/userrouter'));

require('./config/dataBase')

app.get('/', (req, res) => {
    console.log("ee");
    res.redirect('/admin/register');
})
app.use((req, res) => {
    res.render('404');
});


app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server Is Running " + port);
})