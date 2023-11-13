const Brand = require("../models/brand");
const asyncHandler =require('express-async-handler')

const createBrand= asyncHandler(async(req,res)=>{
    const response= await Brand.create(req.body)

    return res.status(200).json({
        success: response? true: false,
        createdBrand: response?response:"Cannot create new brand"
    })
})

const getBrand= asyncHandler(async(req,res)=>{
    const response= await Brand.find()

    return res.status(200).json({
        success: response? true: false,
        brand: response?response:"Cannot get brand"
    })
})

const updateBrand= asyncHandler(async(req,res)=>{

    const {bid}=req.params;
    const response= await Brand.findByIdAndUpdate(bid,req.body,{new:true})

    return res.status(200).json({
        success: response? true: false,
        updatedBrand: response?response:"Cannot update brand"
    })
})
const deleteBrand= asyncHandler(async(req,res)=>{

    const {bid}=req.params;
    const response= await Brand.findByIdAndDelete(bid)

    return res.status(200).json({
        success: response? true: false,
        deletedBrand: response?response:"Cannot delete brand"
    })
})


module.exports={
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
}
