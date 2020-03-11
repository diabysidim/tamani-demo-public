module.exports = { 

              createUsersLoginTable :() => `CREATE TABLE knex_migrations.users_login( id SERIAL NOT NULL  REFERENCES knex_migrations.users(id) ON DELETE CASCADE,
                    username VARCHAR(20) UNIQUE NOT NULL REFERENCES knex_migrations.users(username),
                    password VARCHAR(100)  NOT NULL);`,                     
              



              addUserLogin: (user) =>{

                        return `BEGIN; INSERT INTO knex_migrations.users_login(id, username, password)
                        VALUES('${user.id}','${user.username}', '${user.password}');
                        END TRANSACTION;`
                         },

              updateUserLogin: (username, password) => {

                                return `BEGIN; UPDATE knex_migrations.users_login SET password ='${password}' WHERE
                                              username='${username}';END TRANSACTION;`
                                        },

              deleteUserLogin: (username)=>{

                                  return `BEGIN; DELETE FROM knex_migrations.users_login
                                           WHERE username='${username}'; END TRANSACTION;`

                                       },

              findLoginUser : (username) =>{

                              return `SELECT * FROM knex_migrations.users_login WHERE username='${username}';`},

              findLoginPasswordById : (id) =>{

                              return `SELECT password FROM knex_migrations.users_login WHERE id=${id};`}
            

            }


          


              
              
            