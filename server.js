var express = require('express')
//var http = require('http')
var fs = require('fs')
var https = require('https')
var open = require('open');

var path = require('path')
var reload = require('reload')
var bodyParser = require('body-parser')
var logger = require('morgan')

var app = express()

var publicDir = path.join(__dirname, 'public')

app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))
app.use(bodyParser.json()) // Parses json, multi-part (file), url-encoded
app.use(express.static(publicDir));

app.get('/', function (req, res) {
    res.sendFile(path.join(publicDir, 'index.html'))
})

//var server = http.createServer(app)
var server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app)

// Reload code here
reload(app);

server.listen(app.get('port'), function () {
    let port = app.get('port');
    console.info('Web server listening on port ' + port);
    open(`https://localhost:${port}`)
})

//openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem