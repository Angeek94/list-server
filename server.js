var express=require("express")
var  app=express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var list=require("list-exam")
app.post("/post",function(req,res){
    list.insertToDo(req.body);
    res.status(201).json(list.list)
})
app.get("/listToDo",function(req,res){

    res.json(list.getList());

   
})
app.listen("3001");
