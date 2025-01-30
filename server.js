const express = require("express")
const app = express()

app.get("/api/get", (req, res) => {
    res.send({message: "Hello, listening"})
})

app.get("/api/get_user", (req, res) => {
    res.send({
        user:{
            name: "Shahzaib",
            age: 29,
            contact: 123456789
        }
    })
})

app.listen(8000, () => {
    console.log("listening on 8000")
})