const mongoose = require('mongoose');
const multer = require('multer');
const path=require('path');
const PROFILE_PATH='/uploads/user/profile'

const employerSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if(file.fieldname === 'profile'){
            cb(null, path.join(__dirname, '..',PROFILE_PATH));
        }else{
            cb(null, path.join(__dirname, '../uploads/others'))
        }

    },
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
    }
});

employerSchema.statics.uploads=multer({storage:storage}).single('profile');
employerSchema.statics.profilePath=PROFILE_PATH;

const Employer=mongoose.model('Employer',employerSchema);
module.exports=Employer;