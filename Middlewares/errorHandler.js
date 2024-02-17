const errorHandler = (error, req, res, next)=>{


    if (!error.statusCode) {
        error.statusCode = error.status
    }

    return res.status(error.statusCode || 500).json({success : false, message : error.message || "Internal server error"})
}

module.exports = errorHandler