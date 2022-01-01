const Router  = require('express');
var express = require('express');
var nunjucks = require('nunjucks');
var app = express();
var router = express.Router();

const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);

var port = 3000;
nunjucks.configure('.', {
    autoescape: true,
    express: app
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

var methodOverride = require('method-override');
 
app.use(methodOverride('_method',{methods: ["POST", "GET"]}));

app.get('/',function(req, res){
    res.redirect('/doc/list')   
});
app.get('/style.css',function(req, res){

    res.render('style.css');
});
app.get('/write.html',function(req, res){
    res.render('write.html');
    console.log('write');
});
app.get('/doc/list', function(req, res){
    //var articles = [{id: 1, title: "one", author: "me"}, 
    //{id:2, title: "two", author: "you"}];
    connection.query('SELECT * from node_bbs',(error, rows) =>{ 
        if(error) console.log('select fail... '+ error);
        articles = rows;
        console.log(articles);
        //res.json(articles)
        res.render('layout.html', {title: "bbs for node", body: "World!", articles, });
        console.log('ROOT');
    }); 
});
app.post('/doc',function(req, res){

    var body = req.body;
    var sql = 'INSERT INTO node_bbs (title, author, contents) VALUES (?, ?, ?)';
    var params = [body.title, body.author, body.contents];
    console.log(req.body);
    
    connection.query(sql, params, function(err){
        if(err) console.log('query fail... ' + err);
    });
    res.redirect('/');
    
});
app.get('/doc/:id',function(req, res){
    var articles = [{id: 0, title: "a", author: "b", contents: "c"}];
    if(req.params.id == undefined || req.params.id == ''){
        console.log('article not found');
        res.status(404).send('Sorry, We cannot find article');
        return
    }
    else{
        params = req.params.id;
        connection.query('SELECT * from node_bbs WHERE id=?',params,(error, rows) =>{ 
            if(error) console.log('select fail... '+ error);
            articles = rows;
            if(Array.isArray(articles) && articles.length === 0){
                //console.log('article not found');
                res.status(404).send('Sorry, We cannot find article');
                return
            }
            console.log(articles);
            res.render('read.html',{articles, params, });
        });
        
    }
});
app.delete('/doc/:id',function(req,res){
    params = req.params.id;
        connection.query('DELETE from node_bbs WHERE id=?',params, function(error){ 
            if(error) console.log('delete fail... '+ error);
            console.log('delete ' + params)
        });
    res.redirect('/');
});
app.listen(port);