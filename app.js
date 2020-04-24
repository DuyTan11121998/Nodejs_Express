var _ = require("express");
var cookiePaster=require("cookie-parser");

var app =_();

var port =3000;

app.use("/assets",_.static(__dirname+"/publish"));
app.use (cookiePaster());

//custom middware
// return một cái url 
app.use("/",function(req,res,next){
    console.log("Request URL: ",req.url);
    req.requesTime = new Date();
    next(); //để các request phía sau tiếp tục được
})

//trả về một cookies dưới dạng JSON
app.get("/",function(req,res){
    console.log("Cookei: ",req.cookies);
    res.send(`
        <link href="/assets/style.css" rel="stylesheet" type="text/css">
        <h1> Hello Express</h1>
        <p> Request time : ${req.requesTime}</p>
    `);
})

app.get("/api",function(req,res){
    res.json({
        firstname: "Mai",
        lastName: "Hoa"
    })
})
//user/123
//lấy giá trị của biến lưu vào cookie
app.get("/user/:id",function(req,res){
    res.cookie("userName",req.params.id);
    res.send(`<h1> User: ${req.params.id}<\h1>`);
})

app.listen(port,function(){
    console.log("Server is listening",port);
})