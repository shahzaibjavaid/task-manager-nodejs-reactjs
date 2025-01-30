const express = require("express")
const app = express()
require("dotenv").config()
const mysql = require("mysql")

const db = mysql.createConnection({
    host: "database-1.cbw2e6w84kse.ap-south-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "AWSNODESQL123",
    database: "my_db"
})

db.connect(err => {
    if(err){
        console.log(err.message)
        return
    }
    console.log("Database connected")
})

app.get("/api/get", (req, res) => {
    res.send({message: "Hello, listening"})
})

app.get("/api/get_user", (req, res) => {
    res.send({
        user:{
            name: "Shahzaib",
            age: 29,
            contact: 123456789
        },
        env:process.env.NAME
    })
})

app.listen(process.env.PORT, () => {
    console.log("listening on 8000")
})