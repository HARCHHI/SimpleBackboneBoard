var port=3000;
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app=express();
mongoose.connect('mongodb://localhost/test');

var MessSchema = new mongoose.Schema({
    name : String ,
    message : String,
    rootMess : String,
    updated_at: {type : Date, default: Date.now}
});
var Mess = mongoose.model('Mess',MessSchema);

app.use(express.static(__dirname+'/assets'));
app.use(bodyparser());

app.get('/',function(req,resp){
	resp.sendfile('index.html');
});

app.post('/mess', function(req,resp){
    var mess=new Mess(req.body);
    mess.save(function(err){
        if (err) console.error(err);
        resp.send(mess);
    });
});

app.get('/mess/:_id',function(req,resp){
    Mess.find({$or:[{'rootMess': req.params._id},{'_id': req.params._id}]},function(err,rs){
        if(err)console.error(err);
        resp.send(rs);
    });
});

app.get('/mess',function(req,resp){
    Mess.find( {'rootMess':''} ,function(err,rs){
        if(err)console.error(err);
        resp.send(rs);
    });
});

app.listen(port);
console.log("working on "+port);
