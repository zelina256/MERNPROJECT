let express = require('express');
let app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const contactRoute = require("./routes/contactRoute")

// Krijimi i lidhjes me databazën
mongoose.connect("mongodb://localhost:27017/mydatabase")
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log("Database connection error:", err)
})
// Therritja e route-ve
app.use(contactRoute)

// Krijimi i serverit
app.listen(5000, ()=>{
    console.log("Server created")
})