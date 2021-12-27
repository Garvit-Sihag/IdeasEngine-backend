const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

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
        refPath:'onModel'
    },
    onModel:{
        type:String,
        require:true,
        enum:['Employee','Employer']
    },
    tags:[
        {
            type:String
        }
    ]

},{
    timestamps:true
})

const Post=mongoose.model('Post',postSchema);
module.exports=Post;