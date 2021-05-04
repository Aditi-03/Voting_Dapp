const express= require('express');
const router = express.Router();
const User=require('../models/user');
const bcrypt=  require('bcrypt');

// router.post('/signin',(req,res)={

    
// });

router.post('/signup',(req,res)=>{
    User.findOne({ email: req.body.email})
    .exec(async (error,user)=>{
        if(user) return res.status(400).json({
            message: 'User already registered'
        });
    

/*here */
        const {
            firstName,
            lastName,
            email,
            password
        }=req.body;
        const hash_password = await bcrypt.hash(password, 10);  
         console.log( hash_password);
        const _user=new User({
            firstName,
            lastName,
            email,
            hash_password,
            //password,
            username: Math.random().toString()     
           });
           _user.save((error,data)=>{
               if(error)
               {
                   return res.status(400).json({
                       message: error
                       
                   });
               }
               if(data){
                   return res.status(201).json({
                       user:data
                   })
               }
           });
    });
});

 module.exports = router;
