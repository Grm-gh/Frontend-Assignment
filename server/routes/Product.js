const express = require('express');
const router = express.Router();
const ensureauth = require('../middleware/authproduct');
router.get('/',ensureauth,(req,res)=>{
    res.status(200).json({
        name:"mobile",
        price:10000
    })
});
module.exports=router;