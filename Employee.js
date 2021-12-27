const mongoose = require('mongoose');
const multer = require('multer');
const path=require('path');
const PROFILE_PATH='/uploads/user/profile'
const RESUME_PATH='/uploads/user/resume'

const employeeSchema = new mongoose.Schema({

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
    },
    resume:{
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
        }else if(file.fieldname === 'resume'){
            cb(null, path.join(__dirname, '..' , RESUME_PATH));
        }else{
            cb(null, path.join(__dirname, '../uploads/others'))
        }

    },
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
    }
});

employeeSchema.statics.uploads=multer({storage:storage}).fields([{ name: 'profile', maxCount: 1},{ name: 'resume', maxCount: 1}]);
employeeSchema.statics.profilePath=PROFILE_PATH;
employeeSchema.statics.resumePath=RESUME_PATH;

const Employee=mongoose.model('Employee',employeeSchema);
module.exports=Employee;