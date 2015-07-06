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
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//importar definicion de la tabla comment
var comment_path =  path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);


//exportar definicion de tabla quiz
exports.Quiz = Quiz;
exports.Comment = Comment;
//sequelize.sync() crea e inicializa tabla de preguntas ern DB
// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.bulkCreate(
        [ {pregunta: 'Capital de Italia',   respuesta: 'Roma', tema: 'Humanidades'},
        {pregunta: 'Capital de Argentina',   respuesta: 'Buenos Aires',tema: 'Humanidades'},
          {pregunta: 'Capital de Panamá',   respuesta: 'Panamá',tema: 'Humanidades'},
            {pregunta: 'Campeon copa America 2015',   respuesta: 'Chile',tema: 'Ocio'},
                        {pregunta: 'Avion impulsado por energia solar',   respuesta: 'Solar Impulse 2',tema: 'Ciencia'},
          {pregunta: 'Capital de Portugal', respuesta: 'Lisboa',tema: 'Humanidades'}
        ]
      ).then(function(){console.log('Base de datos inicializada')});
    };
  });
});
