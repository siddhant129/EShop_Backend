const express = require('express')
const router = express.Router()
const {OrderItem} = require('../Models/orderItems')
const mongoose = require('mongoose')

router.get('/',async (req,res)=>{
    const allOrders = await OrderItem.find()
    res.send(allOrders)
})

router.get('/:id',async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false,message : 'Order item id not found'})
    }
    const Orditem = await OrderItem.findById(req.params.id).populate('product')
    if (!Orditem) {
        res.status(404).json({success : false , message : 'Order item not found'})        
    } else {
        res.send(Orditem)
    }
})

//post API
router.post('/',async (req,res)=>{
    let newOrderItem = new OrderItem({
        id : req.body.id,
        product : req.body.product,
        quantity : req.body.quantity
    })
    OrderItem.create(newOrderItem).then(res.status(200).json({success: true, message : 'New order created successfully'}))
    // const orderItemPrms = await OrderItem.create(orderItem).then(res.send(orderItem))
    
})


router.delete('/:id',async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false,message : 'Order item id not found'})
    }
    OrderItem.findByIdAndRemove(req.params.id).then(res.status(200).json({success: true, message : 'Order deleted successfully'}))
})

router.put('/:id',async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({success: false,message : 'Order item id not found'})
    }
    const updatedOrd = await OrderItem.findByIdAndUpdate(req.params.id, {
        id : req.body.id,
        product : req.body.product,
        quantity : req.body.quantity
    },
    {new: true})
    res.send(updatedOrd)
})

//to get count of the orders
router.get('/get/count',async (req,res)=>{
    const ordItemsCount = await OrderItem.countDocuments()
    if (!ordItemsCount) {
        return res.status(404).json({success: false,message : 'Order items not found'})
    }
    res.send({
        OrderItems : ordItemsCount
    })
})


module.exports = router