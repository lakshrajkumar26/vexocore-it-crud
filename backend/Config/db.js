const mongoose = require("mongoose");
require('dotenv').config();

const URL = process.env.MONGO_URL 

mongoose.connect(URL);

const db =mongoose.connection;

db.on("connect",()=>{
    console.log("conencted to db");
})

db.on("disconnect",()=>{
    console.log("disconencted from db");
})

db.on("error",(error)=>{
    console.log("error in connection",error);
})

module.exports = db;