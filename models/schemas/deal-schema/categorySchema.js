module.exports = { 

              createCategoriesTable:()=> `CREATE TABLE knex_migrations.categories(id SERIAL PRIMARY KEY, 
                            category VARCHAR(50) UNIQUE NOT NULL)`, 

             
             addCategory: (category) => {

                            return `BEGIN; INSERT INTO knex_migrations.categories(category)
                            VALUES('${category}');END TRANSACTION;`
                          },

              deleteCategory: (category) => {

                                return `BEGIN; DELETE FROM knex_migrations.categories
                                          WHERE username='${category}';END TRANSACTION;`
                            },

              displayCategories: () =>{

                        return `SELECT category FROM knex_migrations.categories;`
              },

              getCategory: (category)=> {

                      return `SELECT category FROM knex_migrations.categories WHERE category = '${category}';`
              }



            }


          


              
              
            