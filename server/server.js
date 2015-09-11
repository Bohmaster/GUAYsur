var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var app = module.exports = loopback();

var ds = loopback.createDataSource({
  connector: require('loopback-component-storage'),
  provider: 'filesystem',
  root: path.join(__dirname, 'storage')
});

var Container = ds.createModel('container');
app.model(Container);

app.use(function(req, res, next) {

  console.log(req.headers);

  if(req.headers['user-agent'] == 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)') {
    console.log('FBBBBBBBBBBBBBBBBBBBB');
    console.log(1,req.params);
    console.log(2,req.baseUrl);
    console.log(3,req.url);
  }

  if (req.headers['user-agent'] == 'facebookexternalhit/1.1') {
    console.log('fbbbbbbbbbbbbbbbbbbbbbbbbb');
  } if (req.headers['user-agent'] == 'facebookexternalhit/1.0') {
    console.log('fbbbbbbbbbbbbbbbbbbbbbbbbb');
  }

  next();

});

app.use(loopback.static(path.resolve('client')));

app.use(loopback.favicon());

app.get('/noticia/:id', function(req, res, next){
  console.log("noticia", req.params);

  var Noticia = req.app.models.Noticia;

  var element = [];

  Noticia.findById(req.params.id, function(err, result) {

    if (err) {
      console.log(err);
      return next(err);
    }

    element = result;

    console.log(element);

    res.send('<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
    '<meta property="og:title" content="' + element.titulo + '" />' +
    '<meta property="og:description" content="' + element.descripcion + '" />' +
    '<meta property="og:image" content="<?php echo $data->image; ?>" />'+
    '</head>'+
    '<body>'+
    '<p>' + element.titulo + '</p>'+
    '</body>'+
    '</html>');

    next();

  });


});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log(path.resolve('client'));
    console.log('Web server listening at: %s', app.get('url'));
    console.log(path.join(__dirname, 'storage'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
