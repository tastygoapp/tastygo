const express = require("express")
const config = require("config")
const cors = require("cors")
var bodyparser=require('body-parser');
const userRoutes = require('./routes/userRoute')
const addressRoutes = require('./routes/addressRoute')
const restaurantRoutes = require('./routes/restaurantRoute')
const dishRoutes = require('./routes/dishRoute')
const deliverPartnerRoutes = require('./routes/deliveryPartnerRoute')
const orderRoutes = require('./routes/orderRoute')
const orderStatusRoutes = require('./routes/orderStatusRoute')
const orderMenuItemRoutes = require('./routes/orderMenuItemsRoute')

const app = express()

app.use(cors())

app.use(express.json())

console.log("index request")
app.use(express.static("uploads"))

app.use(bodyparser.urlencoded({extended:false}));
app.use('/users',userRoutes)
app.use('/addresses',addressRoutes)
app.use('/restaurants',restaurantRoutes)
app.use('/dishes',dishRoutes)
app.use('/deliverPartners',deliverPartnerRoutes)
app.use('/orders',orderRoutes)
app.use('/order-statuses',orderStatusRoutes)
app.use('/order-menu-items',orderMenuItemRoutes)

const portNo = config.get("PORT");
app.listen(portNo,()=>{console.log("Server Started at " + portNo)})