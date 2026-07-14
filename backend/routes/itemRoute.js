const express = require("express")
const app = express()
const itemModel = require("../models/itemModel")
const multer = require("multer")
const path = require("path")

// Konfigurimet per multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
let upload = multer({ storage, fileFilter })
// Create
app.post("/addItem/", upload.single("itemImage"), async (req, res) => {
    try {
        // req.body merr informacione nga react
        console.log(req.body)
        // Informacionet e marra nga react kalojne tek modeli
        const newItem = new itemModel({
            ...req.body,
            itemImage: req.file.filename
        })
        // Ruajtja e informacionit
        await newItem.save()
        console.log("Item added " + newItem)
        res.status(200).send(newItem)
    } catch (err) {
        console.log("Item not added: " + err)
        res.status(500).send("Item not added: " + err)
    }
})
// Read all => get
app.get("/readAllItem/", async (req, res) => {
    try {
        const allItems = await itemModel.find({})
        console.log(allItems)
        res.status(200).send(allItems)
    } catch (err) {
        console.log("Items not read: " + err)
        res.status(500).send("Items not read " + err)
    }
})
// Read one => get
app.get("/readOneItem/:id", async (req, res) => {
    try {
        const idItem = req.params.id
        const oneItem = await itemModel.findById(idItem)
        console.log(oneItem)
        res.status(200).send(oneItem)
    } catch (err) {
        console.log("Item not read: " + err)
        res.status(500).send("Item not read " + err)
    }
})
// Update one => patch/put
app.patch("/updateOneItem/:id", upload.single("itemImage"), async(req, res)=>{
    try{
        const idItem = req.params.id
        const itemInfo = {...req.body}
        if(req.file){
            itemInfo.itemImage= req.file.filename
        }
        const updateItem = await itemModel.findByIdAndUpdate(
           idItem,
           {$set:itemInfo},
        {new:true}
        )
        console.log(updateItem)
        res.status(200).send(updateItem)
    }catch (err) {
        console.log("Item not updated: " + err)
        res.status(500).send("Item not updated: " + err)
    }
})
// Delete => delete
app.delete("/deleteOneItem/:id", async(req, res)=>{
    try{
        const idItem = req.params.id
        await itemModel.deleteOne({_id:idItem})
        console.log("Item deleted")
        res.status(200).send("Item deleted")
    }catch (err) {
        console.log("Item not deleted: " + err)
        res.status(500).send("Item not deleted " + err)
    }
})
module.exports = app