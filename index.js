var express = require("express");
var app = express();
var req = require('request');
var data = require('./data.json');
app.use(express.logger());

app.get('/', function(request, response) {
    if (request.query.url) {
        req.get(request.query.url, function (error, resp, body) {
            if (!error && resp.statusCode == 200) {
                response.send(body);
            }
        });
    } else {
        response.send(data);
    }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
