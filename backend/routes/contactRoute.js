const express = require("express")
const app = express()
const contactModel = require("../models/contactModel")

app.post("/addContact/", async(req,res)=>{
    try{
        // req.body merr informacione nga react
        console.log(req.body)
        // Informacionet e marra nga react kalojne tek modeli
        const newContact = new contactModel(req.body)
        // Ruajtja e informacionit
        await newContact.save()
        console.log("Contact added "+newContact)
        res.status(200).send(newContact)
    }catch(err){
        console.log("Contact not added: "+err)
        res.status(500).send("Contact not added: "+err)
    }
})



module.exports = app