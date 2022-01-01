var express = require('express');
var http = require('http');
var url = require('url');
var nunjucks = require('nunjucks');

var fs = require('fs');

const app = http.createServer(function(request,response){
var _url = request.url;
console.log(_url);
const hostname = 'http://127.0.0.1:3000';
var urls = new URL(hostname + _url);
console.log(urls);
var queryData = urls.searchParams;

console.log(queryData);
queryData.get('help');
console.log(queryData.get('help'));
//console.log(_url.searchParams.get('help'));
 
response.writeHead(200);
response.end(fs.readFileSync(__dirname + '/layout.html'));
});
app.listen(3000);