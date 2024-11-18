const express = require("express");
const router = express.Router();
const Categories = require("../models/Categories");
const Response =require("../lib/Response");
const CustomError = require("../lib/Error");
const Enum = require("../config/Enum");
const mongoose = require("mongoose");
const AuditLogs=require("../lib/AuditLogs");
const logger=require("../lib/logger/LoggerClass");




/* GET users listing. */
router.get("/",async(req, res, next)=> {
  try{
    let categories = await Categories.find({})
    res.json(Response.successResponse(categories));
  }catch(err){
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(errorResponse))
  }
  
});

router.post("/add",async(req,res)=>{
  let body= req.body;
    try {
      if(!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error!","name field must be filled"); 
      let category = new Categories({
        name:body.name,
        is_active:true,
        created_by:req.user?.id
      })
      await category.save();
      AuditLogs.info(req.user?.email,"Categories","Add",category);
      logger.info(req.user?.email,"Categories","Add",category);

      res.json(Response.successResponse({success:true}));
    } catch (err) {
      logger.error(req.user?.email,"Categories","Add",err);
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);

    }

});



router.put("/update",async(req,res)=>{
  let body= req.body;
  try {
    if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error!","_id field must be filled"); 
    let updates={};
    if(body.name){updates.name=body.name}
    if(typeof body.is_active==="boolean"){updates.is_active=body.is_active}
    await Categories.updateOne({_id:body._id},updates);
    AuditLogs.info(req.user?.email,"Categories","Update",{_id:body._id, ...updates});
    res.json(Response.successResponse({success:true}))
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.delete("/delete",async(req,res)=>{
  let body = req.body;
  try {
     if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Error!","_id field must be filled");
     if (!mongoose.Types.ObjectId.isValid(body._id)) {
      throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "_id is not a valid ObjectId");
    } 
     await Categories.deleteOne({_id: body._id });
     AuditLogs.info(req.user?.email,"Categories","Delete",{_id:body._id});
     res.json(Response.successResponse({success:true}))
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;
