const db = require('../models/index');
const config = require('../config/auth.config');
const User = db.user;
const role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// regis user
exports.signup = (req, res) => {
  let new_user = {
    username:req.body.username,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password, 8)
  };
  User.create(
    new_user
  ).then((user) => {
    if(req.body.roles){
      role.findAll({
        where:{
          name:{
            [Op.or]:req.body.roles
          }
        }
      }).then((roles) => {
        user.setRoles(roles).then(() => {
          res.send({
            message:'regis user success'
          });
        });
      });
    }else{
      user.setRoles([1]).then(() => {
        res.send({
          message:'regis user success'
        });
      });
    }
  }).catch((err) => {
    res.status(500).send({
      message:err.message
    });
  });
};

// login user
exports.signin = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // get user by username
  User.findOne({
    where:{
      username:username
    }
  }).then((user) => {
    // error handle when user not found
    if(!user){
      return res.status(404).send({
        message:'user not found'
      });
    }
    // check if password match
    let passwordIsValid = bcrypt.compareSync(
      password, 
      user.password);
    //error handle when password invalid 
    if(!passwordIsValid){
      return res.status(401).send({
        accessToken:null,
        message:'invalid password'
      });
    }

    // set token
    let token = jwt.sign({id:user.id}, config.secret, {
      expiresIn:86400 //24hours      
    });

    let authorities = [];
    user.getRoles().then((roles) => {
      for(let i = 0; i < roles.length; i++){
        authorities.push(`ROLE_${roles[i].name.toUpperCase()}`);
      }
      res.status(200).send({
        id:user.id,
        username:user.username,
        email:user.email,
        roles:authorities,
        accessToken:token
      });
    });

  }).catch((err) => {
    return res.status(500).send({
      message:err.message
    });
  });
};