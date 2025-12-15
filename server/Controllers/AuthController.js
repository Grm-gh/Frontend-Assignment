const bcrypt=require('bcrypt')
const usermodel = require("../models/User")
const jwt=require('jsonwebtoken')

const signup = async(req,res) => {
    try{
        const{name,email,password} = req.body;
        const user=await usermodel.findOne({email});
        if(user){
            return res.status(409).json({message:"User already exist, YOu can login", success: false });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new usermodel({name,email,password:hashedPassword});
        await newUser.save();
        res.status(201).json({message:"User created successfully", success: true });
    } catch(error){
        res.status(500).json({message:"Server error", error: error.message });
    }

}

const login = async (req,res) => {
    console.log("login called")
    try{
        const {email,password}=req.body
        const user=await usermodel.findOne({email});
        if(!user){
            return res.status(403).json({message:"Auth failed", success : false });
        }
        const ispasswordEqual=await bcrypt.compare(password,user.password);
        if(!ispasswordEqual){
            return res.status(403).json({message:"Auth failed", success : false});
        }
        const jwttoke=jwt.sign(
            {email : user.email,_id:user.id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(200)
        .json({message: "Logedin" , success:true,jwttoke,email,user:user.name});
    }catch(error){

    }
}

module.exports = { signup, login };