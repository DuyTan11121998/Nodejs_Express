var _ = require("express");
var cookieParser=require("cookie-parser");
var bodyParser = require("body-parser");
var app =_();

//khai báo để đọc nội dung body phục vụ cho xử lý dữ liệu POST(key:value)
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Để đọc được các thông tin người dùng gửi lên dưới dạng JSON
var jsonParser = bodyParser.json()

var port =3000;

//de truy cap den style.css
app.use("/assets",_.static(__dirname+"/publish"));

app.use (cookieParser());
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
    res.render("user.ejs",{ID:req.params.id, queryString: req.query.qstr });
})
 
app.get("/api",function(req,res){
    res.json({
        firstname: "Mai",
        lastName: "Hoa"
    })
})

app.post("/login",urlencodedParser, function(req,res){
    res.send("Wellcome, "+ req.body.username);
    console.log(req.body.username);
    console.log(req.body.password);
})

app.post("/loginJson",jsonParser,function(req,res){
    res.send("OKE");
    console.log(req.body.firstName);
    console.log(req.body.lastName);
})
app.listen(port,function(){
    console.log("Server is listening",port);
})