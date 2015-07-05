var models = require('../models/models.js');
//autoload- factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
 models.Quiz.findById(quizId).then(
 function(quiz) {
     if (quiz) {
      req.quiz = quiz;
      next();
    } else { next(new Error('No existe quizId=' + quizId)); }
   }
  ).catch(function(error) { next(error);});
};
// get /quizes
exports.index = function(req, res) {
  var search = "%";

  if(req.query.search != undefined)
  {
  search = "%" + req.query.search + "%";
  search = search.trim().replace(/\s/g,"%");
  }

  models.Quiz.findAll({where:["upper(pregunta) like ?", search.toUpperCase()], order: 'pregunta ASC'}).

then(
  function(quizes) {
    res.render('quizes/index', { quizes: quizes,    errors: []});
   }
  ).catch(function(error) { next(error);})
};


// get /quizes/:id
exports.show = function(req,res){

    res.render('quizes/show', {quiz: req.quiz,    errors: []});
  };


//get quizes/:id/answer
exports.answer = function(req,res){
var resultado = 'Incorrecto';
 if (req.query.respuesta === req.quiz.respuesta) {
   resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado,     errors: []});
   };
   exports.new = function(req,res){
     var quiz = models.Quiz.build(//crea objeto quiz
       {pregunta: "Pregunta", respuesta: "Respuesta"}
     );
     res.render('quizes/new',{quiz: quiz,    errors: []});
   };
   // post /quizes/create
exports.create = function(req,res){
  var quiz = models.Quiz.build( req.body.quiz);
  quiz
  .validate()
  .then(
    function(err){
      if(err){
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        //guarda en DB los campos pregunta y respuesta de quiz
        quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
          res.redirect('/quizes');
        })//redireccion HTTP (url relativo) lista de preguntas
      }
    }
  )

};
