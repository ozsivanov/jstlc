var connectRoute = require('connect-route'),
    fs = require('fs');

module.exports = function() {
  var returnJSON = function(res, json) {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(json));
    res.end();
  };

  var register = function(app) {
    app.use(connectRoute(function(router) {
      router.get('/gallery', function(req, res, next) {
        var galleryJSON = fs.readFileSync('./server/json/gallery.json', 'utf8');
        returnJSON(res, galleryJSON);
      });

      router.get('/news', function(req, res, next) {
        var newsJSON = fs.readFileSync('./server/json/news.json', 'utf8');
        returnJSON(res, newsJSON);
      });
    }));
  };

  return {
    register: register
  };
};
