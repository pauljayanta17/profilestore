require('dotenv').config()
const express = require("express");
const connectToMongo = require("./db").connectToMongo;
const cors = require('cors')
 
// connect to mongodb function
connectToMongo();

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use('/',require('./routes/home'))
app.use('/auth',require('./routes/auth'))
app.use('/profile',require('./routes/profile'))

app.listen(port,()=>{
    console.log(`Listining on the port ${port}`)
})