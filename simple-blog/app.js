
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ArticleProvider = require('./article-provider-mongo').ArticleProvider;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//var articleProvider= new ArticleProvider();
var articleProvider = new ArticleProvider('localhost', 27017);


//list posts
app.get('/', function(req, res){
    articleProvider.findAll( function(error,articles){
        res.render('index-2', {
            title: 'Posts list',
            articles:articles
          });
    })
});


//new form
app.get('/blog/new', function(req, res) {
    res.render('new-blog.jade', { locals: {
        title: 'New Post'
    }
    });
});

//new save handler
app.post('/blog/new', function(req, res){
    articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function( error, docs) {
        res.redirect('/')
    });
});

//post detail
app.get('/blog/:id', function(req, res) {
    articleProvider.findById(req.params.id, function(error, article) {
        res.render('show-blog.jade',
         {
            title: article.title,
            article:article
          });
    });
});

//add a comento to a post
app.post('/blog/addComment', function(req, res) {
    articleProvider.addCommentToArticle(req.param('_id'), {
        person: req.param('person'),
        comment: req.param('comment'),
        created_at: new Date()
       } , function( error, docs) {
           res.redirect('/blog/' + req.param('_id'))
       });
});





//print articles as json
app.get('/json-index', function(req, res){
  articleProvider.findAll(function(error, docs){
      res.send(docs);
  });
})

//old index using routes. take a look here.
app.get('/default-index', routes.index);

//idem
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/*Blog old code*/
/*

var express = require('express');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views'); //equivalent
  app.set('view engine', 'jade'); //equivalent
  app.use(express.bodyParser()); //equivalent
  app.use(express.methodOverride()); //equivalent
  app.use(require('stylus').middleware({ src: __dirname + '/public' })); //
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var articleProvider= new ArticleProvider();

app.get('/', function(req, res){
  articleProvider.findAll(function(error, docs){
      res.send(docs);
  });
})

app.listen(3000);

*/