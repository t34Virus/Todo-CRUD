var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo_test');
var Schema = mongoose.Schema;

var todo = new Schema({
  title: String,
  description: String,
  is_done: Boolean,
  created_at: Date
});

var Todo = mongoose.model('Todo', todo);

// serves static assets
app.use(express.static(__dirname + 'public/'));
app.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());
app.set('view engine', 'jade');

 
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('you posted:\n');
//   res.end(JSON.stringify(req.body, null, 2));
// });

app.get('/', function (req, res) {
  Todo.find(function(err, todosFromDB){
    if (err) throw err;
    res.render('index', {todos: todosFromDB });  
  });
});
//delete todo
app.delete('/todos/:id', function (req, res) {
  Todo.remove({_id:req.params.id},
    function(err, todo) {
  res.redirect('/');  
  });
});
  console.log(todo);
app.get('/new_todo', function (req, res) {
  res.render('new_todo');  
});
//new todo
app.post('/todos', function (req, res) {
  var todo = new Todo(
  {
    title : req.body.title,
    description : req.body.description,
    is_done : false,
    created_at : new Date()
  });
  todo.save(function(err){
    if (err) throw err;
    res.redirect("/");
  });   
});

app.put('/todos/:id/complete', function (req, res) {
  res.send('PUT');  
});

app.put('/todos/:id/incomplete', function (req, res) {
  res.send('PUT');  
});

//edit todo
app.put('/todos/:id', function (req, res) {
  Todo.update({_id:req.params.id},
    { title: req.body.title,
      description: req.body.description
    }, function (err, todo){
    res.render('/');  
  });
});

app.put('/todos:id', function (req, res) {
  res.send('PUT');  
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});



