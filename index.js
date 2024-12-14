const express = require("express");
const path = require("path")
const app = express();
const PORT = 8000 ;
const cookiParser = require('cookie-parser')
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")

const Blog = require('./models/blog')

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=>{console.log("mongodb connected");
})

const { checkForAuthenticationCookie } = require("./middlewares/authentication");

app.use(express.static(path.resolve("./public")))


app.set('view engine','ejs')
app.set('views',path.resolve("./views"));


app.use(express.urlencoded({extended:false}))
app.use(cookiParser())
app.use(checkForAuthenticationCookie("token"))

app.get('/',async(req,res)=>{
  const allBlogs = await Blog.find({});
  res.render('home',{
    user:req.user,
    blogs:allBlogs
  });
});

app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`)
)