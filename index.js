const express = require("express");
const bakeRoute = require("./routes/bake");
const morgan = require("morgan");
const mongoose = require("mongoose");


const app = express();

mongoose.connect("mongodb://localhost:27017/bakary").then(() => {
    console.log("Mongo DB connected")
})
    .catch(err => {
        console.log("cannot connect db")
        process.exit(1);//יציאה מהתוכנית
    })


app.use(morgan("common"))
app.use(express.json())



app.use("/bake", bakeRoute)


app.use((err, req, res, next) => {
    let statusCode = res.statusCode || 500;//אם כבר הוגדר הסטטוס קוד קח אותו אחרת שים קוד 500
    let message = err.message || "מצטערים התרחשה שגיאה"
    res.status(statusCode).send(message)
})
//אם מתרחשת שגיאה בשרת שלא ידועה מראש או שזורקים בתוך הקוד שגיאה השגיאות ילכדו כאן
app.listen(4500, () => {
    console.log("server is litening on port 4500")
})