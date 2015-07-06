//MW de autorizacion de accesosHTTP restringdos
exports.loginRequired = function(req, res, next){
  if (req.session.user){
    next();

  }else{
    res.redirect('/login');
  }
};

//get /login -- formulario de login
exports.new = function(req,res){
  var errors = req.session.errors || {};
  req.session.errors ={};
  res.render('sessions/new', {errors: errors});
};

//post /login -- crear la sesion
exports.create = function (req,res){
  var login = req.body.login;
  var password = req.body.password;
  var useController =  require('./user_controller');
  useController.autenticar(login, password, function(error, user){
    if(error){//si ahy error retornamos mensajes de error de sesion
      req.sesion.errors = [{"message": 'Se  ha producido un error: '+error}];
      res.redirect('/login');
      return;

    }
    //crear req.session.user y guardar campos id y username
    //la sesion se define por la existencia de: req.session.user
    req.session.user = {id:user.id, username:user.username};
    res.redirect(req.session.redir.toString());//redireccion a path anterior a login
  });
};

//delete /logout destruir sesion
exports.destroy = function(req,res){
  delete req.session.user;
  res.redirect(req.session.redir.toString());//redireccion a path
};
