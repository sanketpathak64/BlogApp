var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog_app",{ useUnifiedTopology: true,useNewUrlParser: true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date,default:Date.now}
})
var Blog = mongoose.model("Blog",blogSchema);
// Blog.create({
//     title:"Test Blog",
//     image:"https://images.unsplash.com/photo-1445985543470-41fba5c3144a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     body:"this is my blog"
// });
//restful routes 

app.get("/",function(req,res){
    res.redirect("/blogs");
});

//index route
app.get("/blogs",function(req,res){
    
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }
        else {
            res.render("index",{blogs:blogs});
        }
    })
    
});

//new route
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//create route
app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new");
        }
        else {
            res.redirect("/blogs");
        }
    });
});



app.listen(3000,function(){
    console.log("server is running");
})