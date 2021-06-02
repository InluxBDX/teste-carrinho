var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const cors = require('cors');


var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//_1 - produtos abaixo de 10 reais
//_2 - produtos acima de 10 reais

app.get('/api/produtos/', (req,res,next) => {
        if(req && req.query.tipo){
        let tipo = req.query.tipo;  
        tipo === '_1' ?
          fs.readFile("abaixo-10-reais.json", (err,data) =>{
            if(err) res.send({message: "Ocorreu um erro", success:false})
              res.send(JSON.parse(data))
              }) : tipo =='_2' ? fs.readFile("acima-10-reais.json", (err,data) =>{
                  if(err) res.send({message: "Ocorreu um erro", success:false})
                res.send(JSON.parse(data))    
        }) : res.send({success:false, message: "Não encontrado"}) 
      }else{
        res.send({success:false, message: "Requisição não foi enviada!"}) 
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
