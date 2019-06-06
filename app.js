var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');



var addRouter = require('./routes/add');
var usersRouter = require('./routes/users');
var itemRouter = require('./routes/Items');

var app = express();

app.listen(9000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/users', usersRouter);
app.use('/Add', addRouter);
app.get("/", function(req, res){
  try {
    itemRouter.getItem(req,function(err, item){
          if(err){
              throw err
          }else{
            res.render('index.ejs',{
              title : 'Inventory',
              item : item
            });
          }
      })
  } catch (error) {
      res.status(500).send(error);
  }
});

app.get("/Edit/:id", function(req, res){
  try {
    itemRouter.getoneItem(req.params.id,function(err, data){
          if(err){
              throw err
          }else{
              res.render('edit-item',{
                title : 'Edit',
                item : data[0],
                put: true
              });
          }
      })
  } catch (error) {
      res.status(500).send(error);
  }
});


app.post("/Add", function(req, res){
  try {
    itemRouter.insertItem(req.body, function(err, data){
          if(err){
              throw err;
          }else{
            itemRouter.getItem(data.insertId, function(err, data){
                  if(err){
                      throw err;
                  }else{
                    res.redirect('/');
                  }
              })
          }
      })
  } catch (error) {
      res.status(500).send(error);
      
  }
});

app.put("/Edit/:id", function(req, res){
  try {
    itemRouter.updateItem(req.params.id, req.body, function(err, item){
          if(err){
              throw err;
          }else{
            itemRouter.getItem(req.params.id, function(err, item){
                  if(err){
                      throw err;
                  }else{
                    res.redirect('/');
                  }
              })
          }
      })
  } catch (error) {
      res.status(500).send(error);
      
  }
})

app.delete("/delete/:id", function(req, res){
  try {
    itemRouter.deleteItem(req.params.id, function(err, data){
          if(err){
              throw err;
          }else{
            res.redirect('/');
          }
      })
  } catch (error) {
      res.status(500).send(error);
  }
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
