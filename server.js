const express = require("express")
const app = express()
require("dotenv").config()
const mysql = require("mysql")

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
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