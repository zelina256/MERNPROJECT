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
app.post("/addItem/", upload.single("itemImage") , async (req, res) => {
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



module.exports = app