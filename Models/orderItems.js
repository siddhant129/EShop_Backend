const mongoose = require('mongoose')
const Products = require('./product')

const orderItemSchema = mongoose.Schema({
    id :{
        type : Number
    },
    product :{
        type : mongoose.Types.ObjectId,
        ref : 'Products',
        required : true
    },
    quantity :{
        type : Number,
        required : true
    }
})
const OrderItem = mongoose.model('OrderItem',orderItemSchema)
exports.OrderItem = mongoose.model('OrderItem',orderItemSchema)

OrderItem.watch().on('change',data=>{
    console.log(new Date(), data)
})