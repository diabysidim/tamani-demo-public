const jwt = require('jsonwebtoken');

const knex = require('../models/knex');

const tokenSchema = require('../models/schemas/user-schema/tokenSchema');
const userSchema  =  require('../models/schemas/user-schema/userSchema')


module.exports = function addToken(tokenType){

    const secret = tokenType.secret, table = tokenType.table, 
    type = tokenType.type,  username= tokenType.username;

    return knex.raw(tokenSchema.findTokenByUsername(username, type, table))

        .then( async data => {


            const payload = { username:username};
           const token = jwt.sign(payload, secret, {
               expiresIn: '24h'
                   })

                if(data.rows.length ===1 ){

                    
                    

                    let response;

                    try{

                        response= await knex.raw(tokenSchema.updateToken(username, token, table, type))
                        
                        return response[1].rows[0].token;
                    }
                    catch(e){

                        await knex.raw('ROLLBACK;');
                        console.log(err);
                    }

                        
                    
            }
                
            
            else{

                

                let response;

                try{
                    

                   response= await knex.raw(tokenSchema.addToken(username, token, table, type))
                   return response[1].rows[0].token;

                }
                catch(e){
                    await knex.raw('ROLLBACK;');
                   console.log(e)
                }

               
                
            }
        
            
        })


   

    // })
   
    };