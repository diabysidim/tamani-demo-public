module.exports = { 
                      
              createTokenTable: (tableName, usernameType) => `CREATE TABLE knex_migrations.${tableName||'token_table'}( id SERIAL PRIMARY KEY, 
                                        token VARCHAR(255) UNIQUE NOT NULL,

                                        ${usernameType} VARCHAR(100) UNIQUE NOT NULL REFERENCES knex_migrations.users(${usernameType}));`,

            
              createUnreferencedTokenTable: (tableName, usernameType) => `CREATE TABLE knex_migrations.${tableName||'token_table'}( id SERIAL PRIMARY KEY, 
                                        token VARCHAR(255) UNIQUE NOT NULL,
                                        ${usernameType} VARCHAR(100) UNIQUE NOT NULL );`,

              addToken: (username, token, tableName, type) =>{

                            return `BEGIN; 
                                        INSERT INTO knex_migrations.${tableName||'token_table'}(${type}, token)
                                        VALUES('${username}', '${token}') 
                                        RETURNING token;
                                        END TRANSACTION;`
                          },

              updateToken: (username, token, tableName, type)=>{

                          return `BEGIN; 
                          UPDATE knex_migrations.${tableName||'token_table'} 
                          SET token = '${token}'
                          WHERE ${type} ='${username}'
                          RETURNING token;
                          END TRANSACTION;`

                             },

              deleteToken: (token, tableName) =>{

                       return `BEGIN;DELETE FROM knex_migrations.${tableName||'token_table'} 
                        WHERE token='${token}';
                        END TRANSACTION;`

                           },

              findTokenByUsername : (username, type, tableName) =>{

                return `SELECT * FROM knex_migrations.${tableName||'token_table'} WHERE ${type}='${username}';`
              },

              findToken : (token, tableName) =>{

              return `SELECT * FROM knex_migrations.${tableName||'token_table'} WHERE token='${token}';`},


            }


          


              
              
            