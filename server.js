const express = require("express")
const app = express()

app.get("/api/get", (req, res) => {
    res.send({message: "Hello, listening"})
})

app.listen(8000, () => {
    console.log("listening on 8000")
})