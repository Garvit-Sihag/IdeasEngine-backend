module.exports.home = (req,res)=>{

    if(req.session.user){
        return res.render('homeLogedIn',{
            title:`home | ${req.session.user.details.name}`,
            user:req.session.user
        });
    }

    return res.render('home',{
        title:'home'
    });
}