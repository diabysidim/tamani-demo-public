
module.exports = Schema ={ createUsersTable: () => `CREATE TABLE knex_migrations.users( id SERIAL PRIMARY KEY,
                          username VARCHAR(20) UNIQUE NOT NULL, 
                        email VARCHAR(100) UNIQUE NOT NULL,
                        name VARCHAR(50) NOT NULL, 
                        creation_date DATE DEFAULT CURRENT_DATE);`,

              createUsersLoginTable :() => `CREATE TABLE knex_migrations.users_login( id SERIAL NOT NULL  REFERENCES knex_migrations.users(id) ON DELETE CASCADE,
                    username VARCHAR(20) UNIQUE NOT NULL REFERENCES knex_migrations.users(username),
                    password VARCHAR(100)  NOT NULL,
                      admin BOOLEAN DEFAULT FALSE NOT NULL	);`,

                      
              createTokenTable: () => `CREATE TABLE knex_migrations.token_table( id SERIAL PRIMARY KEY, 
                        token VARCHAR(255) UNIQUE NOT NULL,
                          username VARCHAR(20) UNIQUE NOT NULL
                              REFERENCES knex_migrations.users(username));`,

              createCategoriesTable:()=> `CREATE TABLE knex_migrations.categories(id SERIAL PRIMARY KEY, 
                            category VARCHAR(50) UNIQUE NOT NULL)`, 

              createDealsTable: ()=> `CREATE TABLE knex_migrations.deals(id serial PRIMARY KEY,
                            title VARCHAR(50),
                           img VARCHAR(200),
                           category VARCHAR(50) NOT NULL REFERENCES knex_migrations.categories(category) 
                           ON DELETE CASCADE ON UPDATE CASCADE,
                           description VARCHAR(255) NOT NULL,
                           creation_date DATE DEFAULT CURRENT_DATE );`,


              addUser: (username, email, name) => {

                                return `INSERT INTO knex_migrations.users(username, email, name)
                                VALUES('${username}', '${email}', '${name}');`
                              },

              deleteUser: (username) => {

                                return `DELETE FROM knex_migrations.users
                                          WHERE username='${username}';`
                            },

              updateUser: (username, email, name) => {

                        return `UPDATE knex_migrations.users
                               SET email='${email}', name='${name}'
                                WHERE username ='${username}';`
                         },

              findUser : (username) =>{

                          return `SELECT * FROM knex_migrations.users WHERE username='${username}';`},
              
              displayUsers: () =>{
                          return `SELECT * FROM knex_migrations.users;`

                   }, 

              addUserLogin: (username, password) =>{

                        return `INSERT INTO knex_migrations.users_login(username, password)
                        VALUES('${username}', '${password}');`
                         },

              updateUserLogin: (username, password) => {

                                return `UPDATE knex_migrations.users_login SET password ='${password}' WHERE
                                              username='${userename}');`
                                        },

              deleteUserLogin: (username)=>{

                                  return `DELETE FROM knex_migrations.users_login
                                           WHERE username='${username}';`

                                       },

              findLoginPassword : (username) =>{

                              return `SELECT password FROM knex_migrations.users_login WHERE username='${username}';`},
                          
              addToken: (table, username, token) =>{

                            return `BEGIN; 
                                        INSERT INTO ${table}(username, token)
                                        VALUES('${username}', '${token}') 
                                        RETURNING token;
                                        END TRANSACTION;`
                          },

              updateToken: (table, username, token)=>{

                          return `BEGIN; 
                          UPDATE ${table} 
                          SET token = '${token}'
                          WHERE username ='${username}'
                          RETURNING token;
                          END TRANSACTION;`

                             },

              deleteToken: (token) =>{

                          `DELETE FROM knex_migrations.token_table 
                          WHERE token='${token}';`

                           },


              findToken : (token) =>{

              return `SELECT * FROM knex_migrations.token_table WHERE token='${token}';`},

             addCategory: (category) => {

                            return `INSERT INTO knex_migrations.categories(category)
                            VALUES('${category}');`
                          },
            deleteCategory: (category) => {

                            return `DELETE FROM knex_migrations.categories
                                      WHERE username='${category}';`
                        },

          displayCategories: () =>{

                    return `SELECT category from knex_migrations.categories;`
          },

              addDeal: (title, img, category, description) => {

                              return `INSERT INTO knex_migrations.deals(title, img, category, description)
                              VALUES('${title}', '${img}', '${category}', ${description});`
                            },

            deleteDeal: (id) => {

                              return `DELETE FROM knex_migrations.deals
                                        WHERE id=${id};`
                          },

            updateDeal: (id, title, img, category, description) => {

                      return `UPDATE knex_migrations.deals
                             SET title='${title}', img='${img}', category='${category}', description ='${description}'
                              WHERE id =${id};`
                       },

            findDealById : (id) =>{

                              return `SELECT * FROM knex_migrations.deals WHERE id=${id}`

                          },

           
              findDealByTitle : (title) =>{

                return `SELECT * FROM knex_migrations.deals WHERE title LIKE'${title}%';`


              },

              findDealByCategory : (category) =>{

                return `SELECT * FROM knex_migrations.deals WHERE category='${category}';`

            },

            findDealByDescription : (description) =>{

              return `SELECT * FROM knex_migrations.deals WHERE description LIKE '${description}%';`},


              displayDeals: (limit) =>{
                if(limit) return `SELECT * FROM knex_migrations.deals LIMIT ${limit};`
                return `SELECT * FROM knex_migrations.deals;`

               }, 



            }


          


              
              
            
            


// knex.schema.withSchema('knex_migrations').createTable('users', function (table) {
// 	table.increments('id');
// 	  table.string('name').notNullable();
	

// 	  table.string('email').notNullable();
// 	  table.unique('email');
// 	  table.string('username').notNullable();
// 	  table.unique('username');
//       table.timestamp('created_at').defaultTo(knex.fn.now());
//       table.timestamp('updated_at').defaultTo(knex.fn.now());
//     }).then(data => console.log(data))

//     knex.schema.withSchema('knex_migrations').createTable('Users_login', function(table) {
//       table.boolean('admin').notNullable().defaultTo(false);
// 	  table.integer('id').notNullable();
// 	  table.unique('id');
// 	  table.foreign('id').references('id').inTable('Users');	 
// 	  table.string('username').notNullable()
// 	  table.foreign('username').references('username').inTable('users');
// 	  table.unique('username');
// 	}).then(data => console.log(data));