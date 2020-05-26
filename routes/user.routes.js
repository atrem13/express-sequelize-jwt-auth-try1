const {authJwt} = require('../middleware/index');
const userController = require('../controller/user.controller');

module.exports = function(app){
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/test/all', userController.allAccess);
  // user 
  app.get(
    '/api/test/user',
    [authJwt.verifyToken],
    userController.userBoard
  );
  // moderator
  app.get(
    '/api/test/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
  );
  // admin
  app.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

};