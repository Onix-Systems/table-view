var express = require("express");
var app = express();
var request = require('request');
app.use(express.logger());

app.get('/', function(request, response) {
    var answer = null;
    request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
    response.send('<p>test</p>');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
