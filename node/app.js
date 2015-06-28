
/**
 * Module dependencies.
 */

var fs = require('fs')
  , express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , info = require('./routes/info')

var options = {
	key: fs.readFileSync('secrets/key.pem'),
	cert: fs.readFileSync('secrets/cert.pem')
}

var app = express();

app.configure(function(){
  app.set('port', 521);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/users', user.list);
app.get('/menu.json', info.getMenu);
app.get('/institute_alerts.json', info.getMITAlert);
app.get('/news.json', info.getNews);
app.get('/img.json', info.getImg);
app.get('/mbta_alerts.json', info.getMBTA);
app.get('/', routes.index);
app.get('/:num', routes.index);

http.createServer(app).listen(1010, function(){
  console.log("Express HTTP server listening on port 1010");
});

https.createServer(options, app).listen(app.get('port'), function(){
  console.log("Express HTTPS server listening on port " + app.get('port'));
});
