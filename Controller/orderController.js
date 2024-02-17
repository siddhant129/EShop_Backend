const asyncHandler = require('../Middlewares/asyncHandler')
const { Orders } = require('../Models/orders')
const { Users } = require('../Models/user')
const errorResponse = require('../Utils/errorResponse')

// @Post request to create order
// @Private method (Token required)
exports.createOrder = asyncHandler(async (req, res, next) => {

    let orderItem = {
        product: req.body.product,
        quantity: req.body.quantity,
    }
    let newOrder = new Orders({
        user: req.userId,
        orderItems: orderItem,
    })
    const userInfo = await Users.findById(req.userId)
    if (userInfo) {

        newOrder.user = req.userId
        newOrder.street = userInfo.street
        newOrder.apartment = userInfo.apartment
        newOrder.city = userInfo.city
        newOrder.zip = userInfo.zip
        newOrder.country = userInfo.country
        newOrder.phone = userInfo.phone


    }
    const createdOrd = await Orders.create(newOrder)
    if (createdOrd) {
        return res.status(201).json(
            {
                success: true,
                message: 'Order Placed successfully',
                Order: createdOrd
            }
        )
    }
    return next(new errorResponse('Order not placed', 400))


})

// @Get request to get all orders
// @Private method (Token required)
exports.getOrders = asyncHandler(async (req, res, next) => {
    const orders = await Orders.find({ user: req.userId }).populate({
        path: 'orderItems',
        populate: {
            path: 'product'
        }

    })
    if (orders) {
        return res.status(200).json({ success: true, order: orders })
    }
    return next(new errorResponse('Order not found', 404))
})

// @Get request to get all orders
// @Private method (Token required)
exports.getOrder = asyncHandler(async (req, res, next) => {
    const order = await Orders.findById(req.params.id)
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product'
            }
        })
    if (order) {
        return res.status(200).json({ success: true, order: order })
    }
    return next(new errorResponse('Order not found', 404))
})