const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(`${process.env.MANGODB_URL}`).then(()=>{
        console.log("DataBase Connected .....")
    })
    .catch((err)=>{
        console.log("DataBase Connected Error:", err)
    })
}

module.exports = connectDB;