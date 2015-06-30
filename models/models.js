var path = require('path');
//postgres DATABASE_URL
//SQlite DATABASE_URL
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;
//cargar modelo ORM
var Sequelize =require('sequelize');

//Usar BBDD SQlite:
var sequelize = new Sequelize(DB_name, user, pwd,
  {
   dialect: protocol,
  protocol: protocol,
  port: port,
  host: host,
  storage: storage, //solo sqlite
  omitNull: true //solo postgres
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
    //la tabla solo se inicializa si esta vacia \
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
