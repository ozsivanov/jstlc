var bodyParser  = require('body-parser'),
    compression = require('compression'),
    connect     = require('connect'),
    serveStatic = require('serve-static');

var app    = connect(),
    routes = require('./server/routes.js')();

app.use(compression());
app.use(function (req, res, next) {
  if (req.url.match(/.*\/(css)\/.+/)) {
    res.setHeader('Cache-Control', 'public, max-age=86400000');
  }
  next();
});


app.use(bodyParser.urlencoded());

routes.register(app);

app.use(serveStatic(__dirname + '/public')).listen(8080);

console.log('Server started on http://localhost:8080');
