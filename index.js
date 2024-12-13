const express = require("express");
const path = require("path")
const app = express();
const PORT = 8000 ;
const userRoute = require("./routes/user")
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=>{console.log("mongodb connected");
})

app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')
app.set('views',path.resolve("./views"));

app.get('/',(req,res)=>{
  res.render('home')
})

app.use("/user",userRoute)
app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`)
)