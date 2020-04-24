var _ = require("express");
var cookiePaster=require("cookie-parser");

var app =_();

var port =3000;

//de truy cap den style.css
app.use("/assets",_.static(__dirname+"/publish"));

app.use (cookiePaster());
//set up package EJS
app.set("view engine","ejs");

//custom middware
// return một cái url 
app.use("/",function(req,res,next){
    console.log("Request URL: ",req.url);
    req.requesTime = new Date();
    next(); //để các request phía sau tiếp tục được
})

//render trả về một index.ejs
app.get("/",function(req,res){
    res.render("index.ejs");
})


//user/123
//render tra ve cho client
app.get("/user/:id",function(req,res){
    res.render("user.ejs",{ID:req.params.id});
})

app.get("/api",function(req,res){
    res.json({
        firstname: "Mai",
        lastName: "Hoa"
    })
})

app.listen(port,function(){
    console.log("Server is listening",port);
})