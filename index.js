const express = require('express');
const port= process.env.PORT ||  8000;
const app=express();
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const mongoose=require('./config/mongoose')
const MongoDbSessions = require('connect-mongodb-session')(session)

app.use(express.static('./assets'))

app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views','./views');
app.use('/uploads',express.static(__dirname+'/uploads'))


const store = new MongoDbSessions({
    uri:'mongodb://localhost/ideas_engine_development',
    collection:'ExpressSessions'
})

app.use(session({
    secret:"IdeasEngine18001003021gary",
    cookie: {
        maxAge:269999999999
      },
    resave:false,
    saveUninitialized:false,
    store:store
}))


app.use('/',require('./routes/index'));
app.listen(port,(err)=>{
    if(err){
        console.log(`error in starting the server ${err}`);
        return;
    }

    console.log(`server started at http://localhost:${port}`);
})