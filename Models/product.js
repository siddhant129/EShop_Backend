const mongoose = require('mongoose')
const Category = require('./category')
const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ' '
    },

    image: {
        type: String,
        required: true
    },
    images: [
        {
            type: String
        }
    ],
    brand : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating : {
        type : Number,
        required : true
    },
    isFeatured : {
        type : Boolean,
        required : true
    },
    dateCreated : {
        type : Date,
        default : Date.now
    }
})

productsSchema.virtual('id').get(function(){
    return this._id.toHexString()
})
productsSchema.set('toJSON',{
    virtual :true,
})

exports.Products = mongoose.model('Products', productsSchema)

const Products = mongoose.model('Products', productsSchema)

Products.watch().on('change',data=>console.log(data))
