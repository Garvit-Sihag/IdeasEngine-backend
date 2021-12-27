const Post=require('../models/Post');

module.exports.post = (req,res)=>{

    return res.render('post',{
        title:'post'
    });

}

module.exports.createPost = (req,res)=>{
    return res.render('createPost',{
        title:'create-post',
        type:'Post'
    });
}

module.exports.addPost = (req,res)=>{

    return res.redirect('/');

}