const jwt = require('jsonwebtoken');

const knex = require('../models/knex');
const secret = process.env.SECRET;

const isLoggedIn = async function(req, res, next) {

  console.log(req.headers)
  let token = 
      req.body.token ||
      req.query.token ||
      req.headers['authorization'] ||
      req.cookies.token;


      if( token && token === req.headers['authorization'] ) {
        const bearer = token.split(' ');
        token = bearer[1];
        req.token = token;
      }
     
  if (!token) {
    return res.status(401).json({"msg": "please login"});
  } else {
    
    
    const currentSession = await knex('knex_migrations.token_table').select('*')
                            .where({token:token});


    if(currentSession.length > 0) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                   return res.status(401).json("there was a problem! please signin before continuing :) ");
                } else {
                    req.token = token;
                    req.user= decoded;
                    next();
                }
            });

        }
        else return res.status(401).json("you're logged-out please loggin")
  }
}

module.exports = isLoggedIn;