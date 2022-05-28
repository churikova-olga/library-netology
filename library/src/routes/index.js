const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{
    res.render('index',{
        title: "home",
        flag: true,
    })
})

module.exports = router;