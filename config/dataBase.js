const { log } = require('console');
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb+srv://laxsavani:Laksh4259@cluster0.qakhm9i.mongodb.net/')

db.once('open',(err)=>{
    if(err)
    {
        console.log('DataBase Not Connected: '+err);
    }
    console.log("DataBase MongoDb Connected");
})