
const jwt     = require('jsonwebtoken');
const secret = process.env.SECRET;
const knex = require('../models/knex');
const tokenSchema = require('../models/schemas/user-schema/tokenSchema')

const verifyToken = (table) =>{

   return  async (req, res, next) =>{

        const token = req.params.token;
    
        if(!token){
    
           return res.status(401).send("misssing verification");
    
        }
        else{
            
            try{

                const user =  await knex.raw(tokenSchema.findToken(token, table))

                console.log(user);

                if(user.rows.length === 1){
                    

                    jwt.verify(token, secret,(err, decoded)=>{
    
                        if(err) return res.status(401).send("la session a expiree veuillez redemander un autre lien");
                        else{
    
                            req.user = decoded;
                            

                        }
                    }) 
                    
                    await knex.raw(tokenSchema.deleteToken(token, table))

                    next();
                }


                else{

                    return res.status(401).send("cet lien n'existe pas ou a deja ete utilise");

                }
            }
            catch(e){
                console.log(e);
                return res.status(401).send("il ya un problem avec le lien");

            }
           
    
    
        }
    
    }
}
 

module.exports= verifyToken