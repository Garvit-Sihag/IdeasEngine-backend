const Employee=require('../models/Employee');
const Employer=require('../models/Employer');

module.exports.LogIn = (req,res)=>{

    if(req.session.user){
        return res.redirect('/');
    }

    return res.render('login',{
        title:'log in',
        type:req.params.type
    });

}

module.exports.SignUp = (req,res)=>{

    if(req.session.user){
        return res.redirect('/');
    }

    return res.render('signup',{
        title:'Sign up',
        type:req.params.type
    });

}

module.exports.register =async (req,res)=>{

    if(req.session.user) return res.redirect('/');

    Employee.uploads(req,res,async (err)=>{
        if(err) console.log("** multer error");

        let user;

        try {
            if(req.params.type === 'employee'){
                user=await Employee.findOne({email:req.body.email});
                
                 
                if(!user){
                    Employee.create({
    
                        email:req.body.email,
                        name:req.body.name,
                        password:req.body.password,
                        profile:Employee.profilePath+'/'+req.files.profile[0].filename,
                        resume:Employee.resumePath+'/'+req.files.resume[0].filename
    
                    },(err,emp)=>{
    
                        if(err){
                            console.log('error in creating employee',err);
                            return res.redirect('/');
                        }
    
                        console.log(emp);
                    })
                }
    
                return res.redirect(`/user/log-in/${req.params.type}`);
    
            }else if(req.params.type === 'employer'){
                user=await Employer.findOne({email:req.body.email});
                
                if(!user){
                    Employer.create({
    
                        email:req.body.email,
                        name:req.body.name,
                        password:req.body.password,
                        profile:Employer.profilePath+'/'+req.files.profile[0].filename,
                    },(err,emp)=>{
    
                        if(err){
                            console.log('error in creating employee',err);
                            return res.redirect('/');
                        }
                    })
                }
    
                return res.redirect(`/user/log-in/${req.params.type}`);
    
            }else{
                return res.redirect('/');
            }
        } catch (error) {
            console.log(error);
            return res.redirect('/');
        }

        
    })

}

module.exports.createSession = async (req,res)=>{

    if(req.session.user) return res.redirect('/');


    try {

        let details,Schema;

        console.log(req.body);

        if(req.body.type === "employee"){
            Schema=Employee;
        }else if(req.body.type === "employer"){
            Schema=Employer;
        }else{
            return res.redirect(`/user/log-in/${req.body.type}`);
        }


        details = await Schema.findOne({email:req.body.email});
        if(details && details.password === req.body.password){
            console.log(req.session);
            req.session.user = {
                details:details,
                type:req.body.type
            }
            return res.redirect('/home');
        }

        return res.redirect('/user/log-in/${}');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }

}

module.exports.destroySession = (req,res)=>{

    req.session.destroy();

    return res.redirect('/');

}