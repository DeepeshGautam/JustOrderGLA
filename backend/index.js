const express = require("express");
const app = express();
const port = 5000;
const mongoDb = require('./db');
mongoDb();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");   // ismein FE ka URL de de ye fix h BE AND FE ka connection h bass ye maan le
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
    next();
})

app.get('/',(req,res)=>{
    res.send("hello")
})

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/DisplayData"));

app.listen(port,()=>{
    console.log(`App is listening at the ${port}`)
})