
module.exports.createJob = (req,res)=>{
    return res.render('createPost',{
        title:'create-post',
        type:'Job'
    });
}