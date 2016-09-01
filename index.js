var http = require('https');
var fs = require('fs');

var request = http.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5", function(response) {
    console.log(response);
});
