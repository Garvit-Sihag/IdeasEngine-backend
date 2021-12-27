const mongoose=require('mongoose');
const mongoConnectionUrl='mongodb://localhost/ideas_engine_development';

mongoose.connect(mongoConnectionUrl);

const db=mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to mongoDB"));

db.once('open',()=>{
    console.log("Connnected to database");
})


module.exports=db;
module.exports=mongoConnectionUrl;