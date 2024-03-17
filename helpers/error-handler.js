const express = require('express')


function errorHandler(err,req,res,next){
    
        if (err) {
           return  res.status(500).json({message : err.name })
        }
    }


module.exports = errorHandler;