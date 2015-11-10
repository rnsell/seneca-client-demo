/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
/*global describe, it*/
'use strict';


var express = require('express');
var app = express();
var seneca = require('seneca')().client(8080);


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/service1', function (req, res) {
    seneca.act({
        cmd: 'service1',
    }, function (err, result) {
        if (err) {
            res.send(err);
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

// app.get('/service2', function (req, res) {
//     // res.send('Hello World!');
// });
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
