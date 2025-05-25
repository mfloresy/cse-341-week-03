const express = require('express')
const app = express()
const mongodb = require("./database/init.js")
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use("/", require("./routes"))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next();
})

mongodb.init((err)=>{
    if(err){
        console.log(err)
    }else{
        app.listen(port, ()=>{console.log(`Initialized on port ${port}`)})
    }
})