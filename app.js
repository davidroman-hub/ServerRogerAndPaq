const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
//const expressValidator = require('express-validator');
const expressValidator = require('express-validator');
require('dotenv').config();

//app
const app = express()

//data base

mongoose.connect(process.env.DATABASE,{

    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true

})
.then(()=>console.log('Db Connected'))

//import routes
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const categoryRoutes = require('./Routes/category');




//routes 
// app.get('/', (req,res)=>{

//     res.send('hello from node ;)')

// });

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())


//Routes middleware


app.use('/api', authRoutes);
app.use('/api',userRoutes);
app.use('/api', categoryRoutes);




//server

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
