require('dotenv').config()
require('express-async-errors');
const path = require('path')

const express = require('express')
const app = express()

//option pakages
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

//connect database
const connectDB = require('./db/connect')

//routes
const authRouter= require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const orderRouter = require('./routes/orderRoutes')
const hompageRouter = require('./routes/homepageRoute') 
const menuRouter = require('./routes/menuRoutes')

//middleware
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json())
app.use(cookieParser('jwtSecret'))

app.use(express.static('./public'));
app.use(fileUpload());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/KACoffe/v1',hompageRouter )
app.use('/KACoffe/v1/auth', authRouter)
app.use('/KACoffe/v1/user', userRouter)
app.use('/KACoffe/v1/product', productRouter)
app.use('/KACoffe/v1/order', orderRouter)
app.use('/KACoffe/v1/menu', menuRouter)

app.use(notFoundMiddleware)

const port = process.env.PORT || 5000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, (req, res) => {
            console.log(`app is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()