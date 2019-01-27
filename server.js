var express=require("express")
var  app=express()
var cors=require("cors")
app.use(cors())
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var list=require("list-exam")
app.post("/postUsers",function(req,res){
    var user =req.body.user;
    list.insertUsers(user)
    res.status(201).json(list.getUsers());
   
})
app.post("/post",function(req,res){
    var name=req.body.name;
    var description=req.body.description;
    var completed=req.body.completed;
    var assignedTo=req.body.assignedTo;
    if(list.getUsers().indexOf(assignedTo.toLowerCase())>-1){
        
        res.status(201).json(list.insertToDo(name,description,completed,assignedTo))
    }else{
        res.status(401).json({message:"Non puoi aggiungere questo elemento"})
    }
    
})
app.put("/putToDo/:id",function(req,res){
    list.modifyToDoById(req.params.id,req.query.description);
    res.json(list.getList())
})

app.get("/getToDo",function(req,res){
        res.json(list.getList());
    })
app.get("/getUsers",function(req,res){
        res.json(list.getUsers());
})
app.get("/getToDoByUser",function(req,res){
	list.resetReadUsers()
    res.status(200).json(list.readListByUser(req.query.user));
    
    	
})
app.get("/getToDoByStatus",function(req,res){
   
    res.status(200).json(list.readListByStatus(req.query.status));
})
app.get("/listUser",function(req,res){
        var users=[];
        var j=0;
        for(var i=0;i<list.list.length;i++){
            if(list.list[i].assignedTo==req.query.name){
                users[j]=list.list[i];
                j++;
            }
        }
})

app.delete("/deleteToDo/:id",function(req,res){
        var id =  parseInt (req.params.id);
        console.log(list.deleteToDo(id));
        res.status(200).json({messagge:"todo eliminato fai una get con getToDo e verifica di averlo eliminato"});
})


   
app.listen("3001");
