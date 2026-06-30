let express = require('express');
let app = express()



let funcTest = (req,res)=>{
    res.send("Hello")
}
// Krijimi i nje "API"
app.use("/", funcTest)
// Krijimi i serverit
app.listen(5000, ()=>{
    console.log("Server created")
})