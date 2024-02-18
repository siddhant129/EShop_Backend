var express = require('express')
var app = express();

var bodyParser = require('body-parser')
var morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')
const auth = require('./helpers/jwt')
// const errorHandler = require('./helpers/error-handler')
const errorHandler = require('./Middlewares/errorHandler')

const productRouter = require('./Routers/productRouters')
const categoryRouter = require('./Routers/categoryRouters')
const orderItemRouter = require('./Routers/orderItemRouters')
const userRouter = require('./Routers/userRouters')
const orderRouter = require('./Routers/orderRouters')


var uri = process.env.CONNECTION_STRING;

const cors = require('cors')



app.use(cors())
app.options('*',cors())

var api = process.env.API_URL
const NODE_ENV = process.env.NODE_ENV

//middle ware 
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(auth())
app.use(errorHandler)

//Routers
app.use(`${api}/products`,productRouter)

app.use(`${api}/category`,categoryRouter)

app.use(`${api}/orderItem`,orderItemRouter)

app.use(`${api}/user`,userRouter)

app.use(`${api}/orders`,orderRouter)


// Error Handler
app.use(errorHandler)

//Schemas
const products = require("./Models/product")
const Category = require("./Models/category")
const orderItem = require('./Models/orderItems')
const usersSchema = require("./Models/user")
const ordersSchema = require('./Models/orders')

mongoose.connect(`${uri}`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    dbName : 'Eshop',
})
.then(()=>{
    console.log('Database connection successful')
})
.catch((err)=>{
    console.log(err)
})


app.listen(3000, ()=>{
    console.log(`Server is running in ${NODE_ENV}`)
})