const mongoose = require('mongoose');

const jobSchema= new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Employer'
    },
    tags:[
        {
            type:String
        }
    ],
    applicants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Employee'
        }
    ]
},{
    timestamps:true
})

const Job=mongoose.model('Job',jobSchema);
module.exports=Job;