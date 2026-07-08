let express = require('express');
let app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const contactRoute = require("./routes/contactRoute")
const itemRoute = require("./routes/itemRoute")
app.use(cors(
    {
        credentials: true,
        origin: "http://localhost:3000",
        exposedHeaders: ["set-cookie"],
    }))
app.use(session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))
app.use(express.json({ limit: "1000mb", extended: true }));
// Krijimi i lidhjes me databazën
mongoose.connect("mongodb://localhost:27017/mydatabase")
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Database connection error:", err)
    })
// Therritja e route-ve
app.use(contactRoute)
app.use(itemRoute)
// Krijimi i serverit
app.listen(5000, () => {
    console.log("Server created")
})