var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Preise Buecher
var SELF_PHP_PRICE = 25.4;
var PHP_REF_PRICE = 18;
var PHP_COOKBOOK_PRICE = 39;

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/bestellg0.html', function (req, res) {
   res.sendFile(__dirname + "/" + "bestellg0.html");
})

app.post('/calculate', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    var SELF_PHP_AMOUNT = parseInt(req.body.self_php);
    var PHP_RREF_AMOUNT = parseInt(req.body.php_referenz);
    var PHP_COOKBOOK_AMOUNT = parseInt(req.body.php_kochbuch);

    // Berechnung des Gesamtpreises
    var total = SELF_PHP_AMOUNT * SELF_PHP_PRICE + PHP_RREF_AMOUNT * PHP_REF_PRICE + PHP_COOKBOOK_AMOUNT * PHP_COOKBOOK_PRICE;

    res.send(total.toString());
})

app.use(function (request, response) {  // Fehlerbehandlung
 response.status(404).send("Seite nicht gefunden!");
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})