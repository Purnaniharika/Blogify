const express = require("express");
const path = require("path")
const app = express();
const PORT = 8000 ;
const cookiParser = require('cookie-parser')
const userRoute = require("./routes/user")
const mongoose = require('mongoose');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=>{console.log("mongodb connected");
})


app.set('view engine','ejs')
app.set('views',path.resolve("./views"));


app.use(express.urlencoded({extended:false}))
app.use(cookiParser())
app.use(checkForAuthenticationCookie("token"))

app.get('/',(req,res)=>{
  res.render('home',{
    user:req.user
  });
});

app.use("/user",userRoute)
app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`)
)