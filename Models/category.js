const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        icon : {
            type : String,
            required : true
        },
        color : {
            type : String,
            required : true
        },
    }
)
const Category = mongoose.model('Category', categorySchema)
exports.Category = mongoose.model('Category', categorySchema)

Category.watch().on('change',data=>{console.log(data)})
// "64eb74de5925a82669573ea3"