let User = require('../models/user');
let Post  = require('../models/post');
const { body, validationResult } = require('express-validator');


// Handle logout
exports.logout = function(req,res,next){
    req.logout();
    
    return res.json({
        message:'logout succesfully'
    });
}

//Handle SignUP
exports.user_post = [
    body('username','Email is not Valid !').isEmail().escape(),
    body('name','Username must not be empty!').trim().isLength({min:1}).escape(),
    body('password','Password is too Short!' ).isLength({ min: 4 }).escape(),
    function(req,res,next){
        const errors = validationResult(req);

        let user= new User({
            username:req.body.username,
            name:req.body.name,
            password:req.body.password
        });

        if(!errors.isEmpty()){
            return res.json({
                message:errors
            });
        }else{
    
        User.findOne({'username':req.body.username}).exec(function(err,result){
            if(result){
                return res.json({
                    message:"email taken"
                });
            }else{
                
    
                user.save(function(err){
                    if(err){
                        return next(err);
                    }
                    return res.json({
                        message:'user saved successfuly'
                    });
                });
            }
     });
    }
    
        
    }
] 

//Handle Data transfer for client having valid token
exports.user_data = function(req,res,next){
    Post.find({user:req.params.id}).exec(function(err,postobj){
        if(err){
            return next(err);
        }

        return res.json({
            data:postobj
        });
    });
}

// Handle Loan Form Post request
exports.form_post =[
    body('name','Full Name must not be empty!').trim().isLength({min:1}).escape(),
    body('address','Address must not be empty!').trim().isLength({min:1}).escape(),
    body('email','Email is not Valid!').isEmail().escape(),
    
    function(req,res,next){
        const errors = validationResult(req);

        let post = new Post({
            user:req.body.userId,
            name:req.body.name,
            address:req.body.address,
            email:req.body.email,
            loanAmount:req.body.loanAmount,
            startDate:req.body.startDate,
            expiryDate:req.body.expiryDate,
            monthlyInstallment:req.body.monthlyInstallments
        });

        if(!errors.isEmpty()){
            return res.json({
                message:errors
            });
        }else{
            post.save(function(err){
                if(err){
                    return next(err);
                }else{
                    return res.json({
                        message:'Post saved successfully'
                    });
                }
            });
        
           
        }
    
       
    }
] 