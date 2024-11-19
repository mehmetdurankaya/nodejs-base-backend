const express = require("express");
const router = express.Router();
const dayjs=require("dayjs");

const auth= require("../lib/auth")();
const Response = require("../lib/Response");
const AuditLogs = require("../models/AuditLogs");


router.all("*",auth.authenticate(),(req,res,next)=>{
    next();
})
router.post("/",auth.checkRoles("auditlogs_view"),async(req,res)=>{
    let body=req.body;
    let query = {};
    let skip=body.skip;
    let limit=body.limit;

try {
    if(typeof skip!=="number"){
        skip=0;
    }
    if(typeof body.limit!=="number"||body.limit>500){
        limit=500;
    }
    if(body.begin_date && body.end_date){
        query.createdAt = {
            $gte:dayjs(body.begin_date).toDate(),
            $lte:dayjs(body.end_date).toDate()
        }
    }else{
            query.createdAt = {
                $gte:dayjs().subtract(1,"day").startOf("day"),// bugünün tarihinden 1 gün çıkart ve bu günü 00 dan başlat
                $lte:dayjs()
        }
    }   
    let auditLogs = await AuditLogs.find(query).sort({createdAt:-1}).skip(skip).limit(limit);
    res.json(Response.successResponse(auditLogs));
} catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
}
})

module.exports = router