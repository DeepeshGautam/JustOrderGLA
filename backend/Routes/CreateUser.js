const express = require("express")
const router = express.Router();
const User = require('../models/User')
const {body,validationResult} = require('express-validator')
const jwtSecret = "mynameisDeepeshGautam"

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



router.post("/CreateUser",[
    body('email').isEmail(),
    body('name').isLength({min:5}),
    body('password','Password is too short').isLength({min:5})]
,async (req,res)=>{

    const errors = validationResult(req);       // ye backend m data ko save he nhi hone dega agar until above validations must be clear
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let setPassword = await bcrypt.hash(req.body.password,salt)
    try{
        const { name, email, password, location } = req.body;
        await User.create({
            name, 
            password:setPassword,
            email,
            location
        })
        res.json({success:true});
    
    } catch(error){
        console.log(error)
        res.json({success:false})
    }
})


// YE LOGIN USER KA H ISMEIN JUST FIND KRKE THEN MATCH KRA  DE CREDENTIALS KO IF CORRECT THEN LOGIN HO JAYEGA NA TOH INVALID 

router.post("/LoginUser", [
    body('email').isEmail(),
    body('password','Password is too short').isLength({min:5})], async (req,res)=>{
        const errors = validationResult(req);       
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
    let email = req.body.email;
    try{
        let userData = await User.findOne({email});      // agar email nhi mili toh if chal jayega
        if(!userData){
            return res.status(400).json({errors:"Incorrect email"})
        }
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare){                  // agar password match nhi hua toh error
            return res.status(400).json({errors:"Incorrect password"})
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({success:true,authToken:authToken})                // match hua password toh success
    
    } catch(error){
        console.log(error)
        res.json({success:false})
    }
})

module.exports = router