var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz',    errors: [] });
});
//autoload de comandos con :quizId
router.param('quizId',quizController.load); //autoload
//Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
// página para autor
router.get('/author', function(req, res, next) {
<<<<<<< HEAD
  res.render('author', {autor: 'Maria R. Corbalan', errors: []});
=======
  res.render('author', {autor: 'Maria R. Corbalan',  errors: []});
  
>>>>>>> fbd957bfaf1f411d0c438eecb7b0931cc85334e0
});
module.exports = router;
