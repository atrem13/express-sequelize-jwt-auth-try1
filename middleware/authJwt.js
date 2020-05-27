const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models/index');
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
  // check if token exist
  if(!token){
    return res.status(403).send({
      message:'no token provided!'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err){
      return res.status(401).send({
        message:'unauthorized'
      });
    }
    req.userId = decoded.id;
    next(); 
  });
};

isAdmin = (req, res, next) => {
  let userId = req.userId;
  User.findByPk(userId).then((user) => {
    user.getRoles().then((roles) => {
      for(let i = 0; i < roles.length; i++){
        if(roles[i].name === 'admin'){
          next();
          return;
        }
      }
      res.status(403).send({
        message:'only for admin!'
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  let userId = req.userId;
  User.findByPk(userId).then((user) => {
    user.getRoles().then((roles) => {
      for(let i = 0; i < roles.length; i++){
        if(roles[i].name === 'moderator'){
          next();
          return;
        }
      }
      res.status(403).send({
        message:'only for moderator!'
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  let userId = req.userId;
  User.findByPk(userId).then((user) => {
    user.getRoles().then((roles) => {
      for(let i = 0; i < roles.length; i++){
        if(roles[i].name === 'moderator' || roles[i].name === 'admin'){
          next();
          return;
        }
      }
      res.status(403).send({
        message:'only for admin or moderator'
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;

