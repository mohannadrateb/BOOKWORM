const express= require('express');
const router =express.Router();


router.get('/firsttime',(req,res)=>{

res.json(req.body);


})

module.exports=router;