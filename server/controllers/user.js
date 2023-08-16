const User=require('../models/user');
const asyncHandler=require('express-async-handler')


const register=asyncHandler((async(req,res)=>{
    console.log("zo")
    const {email,password,firstname,lastname}=req.body;
    console.log("zoooo")

    if(!email||!password||!firstname||!lastname)
    {
        console.log("zoooo")
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }
  
    console.log("zoooo")

    const response=await User.create(req.body);
    return res.status(200).json({
        success:response ? true : false,
        response
    })
}))

module.exports={
    register
}