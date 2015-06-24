var path = require('path');

//cargar modelo ORM
var Sequelize =require('sequelize');

//Usar BBDD SQlite:
var sequelize = new Sequelize(null,null,null,
{
  dialect: "sqlite", storage: "quiz.sqlite"
}
);
//importar la definicion de la tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'Quiz'));

//exportar definicion de tabla quiz
exports.Quiz = Quiz;
//sequelize.sync() crea e inicializa tabla de preguntas ern DB
sequelize.sync().then(function(){
  //success ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function(count){
    //la tabla solo se inicializa si esta vacia
    if (count=== 0) {
      Quiz.create(
        {
          pregunta: 'Capital de Italia',
          respuesta: 'Roma'
        }
      )
      .then(function(){
      console.log('base de datos inicializada');
    });

  };
});
});
