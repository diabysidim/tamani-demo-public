module.exports = { createUsersTable: (tableName) => `CREATE TABLE knex_migrations.${tableName || 'users'}( id SERIAL PRIMARY KEY,
                          username VARCHAR(50) UNIQUE NOT NULL, 
                        email VARCHAR(100) UNIQUE NOT NULL,
                        name VARCHAR(50) NOT NULL,
                        admin BOOLEAN DEFAULT FALSE, 
                        creation_date DATE DEFAULT CURRENT_DATE);`,

              


              addUser: (user) => {

                                return `BEGIN;
                                   INSERT INTO knex_migrations.users(username, email, name)
                                VALUES('${user.username}', '${user.email}', '${user.name}');
                                   END TRANSACTION;`
                              },

              deleteUser: (username) => {

                                return `BEGIN;
                                          DELETE FROM knex_migrations.users
                                          WHERE username='${username}';
                                          END TRANSACTION;`
                            },

              updateUser: (user) => {

                        return ` BEGIN;
                                   UPDATE knex_migrations.users
                                   SET email='${user.email}', name='${user.name}'
                                WHERE username ='${user.username}';
                                END TRANSACTION;`
                         },

              findUser : (username, type) =>{

                          return `SELECT * FROM knex_migrations.users WHERE ${type}='${username}';`},
              
              displayUsers: () =>{
                          return `SELECT * FROM knex_migrations.users;`

                   }, 

              


            }


          


              
              
            