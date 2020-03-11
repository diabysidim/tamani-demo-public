const jwt = require('jsonwebtoken');

const knex = require('../models/knex');

const tokenSchema = require('../models/schemas/user-schema/tokenSchema');
const userSchema  =  require('../models/schemas/user-schema/userSchema')


module.exports = function addToken(tokenType){

    const secret = tokenType.secret, table = tokenType.table, 
    type = tokenType.type,  username= tokenType.username;
    

    return knex.raw(userSchema.findUser(username, type))
    
        .then( async data => {               
                
            const payload = { 
                id: data.rows[0].id,
                name: data.rows[0].name,
                username: data.rows[0].username,
                admin: data.rows[0].admin};

                console.log(payload)

            const token = jwt.sign(payload, secret, {
                expiresIn: '24h'
            });


                const existingToken = await knex.raw(tokenSchema.findTokenByUsername(username,'username', table))
                if(existingToken.rows.length > 0 ){

                    

                    let response;

                    try{

                        response= await knex.raw(tokenSchema.updateToken(username, token, table, type))
                        
                        console.log(response[1].rows[0].token)
                        return response[1].rows[0].token;
                    }
                    catch(e){

                        await knex.raw('ROLLBACK;');
                        console.log(e);
                    }

                        
                    
            }
                
            
            else{

                

                let response;

                try{

                   response= await knex.raw(tokenSchema.addToken(username, token, table, type))
                   console.log("the response is", response)
                   return response[1].rows[0].token;

                }
                catch(e){
                    await knex.raw('ROLLBACK;');
                   console.log(e)
                }

               
                
            }
        
            
        })



   
    };