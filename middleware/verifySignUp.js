const db = require('../models/index');
const ROLES = db.ROLES;
const User = db.user;

// check duplicate username / email
checkDuplicateUsernameOrEmail = (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  // check username
  User.findOne({
    where:{
      username:username
    }
  }).then((user) => {
    if(user){
      res.status(400).send({
        message:'failed! user already exist'
      });
      return;
    }
    // check email
    User.findOne({
      where:{
        email:email
      }
    }).then((user) => {
      if(user){
        res.status(400).send({
          message:'failed! email alreay exist'
        });
        return;
      }
      next();
    });
  });
};

// check if role exist
checkRolesExisted = (req, res, next) => {
  if(req.body.roles){
    for(let i = 0; i < req.body.roles.lenght; i++){
      if(!ROLES.includes(req.body.roles[i])){
        res.status(400).send({
          message:`failed! roles = ${req.body.roles[i]} doesnt exist `
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;