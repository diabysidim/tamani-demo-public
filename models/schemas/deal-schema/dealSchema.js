module.exports = { 

              createDealsTable: ()=> `CREATE TABLE knex_migrations.deals(id serial PRIMARY KEY,
                            title VARCHAR(255),
                           img VARCHAR(255),
                           category VARCHAR(50) NOT NULL REFERENCES knex_migrations.categories(category) 
                           ON DELETE CASCADE ON UPDATE CASCADE,
                           description VARCHAR NOT NULL,
                           created_by VARCHAR(100) NOT NULL REFERENCES knex_migrations.users(username)
                            ON DELETE CASCADE,
                           creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           views INT DEFAULT 0);`,


              addDeal: (deal) => {

                              return `BEGIN; INSERT INTO knex_migrations.deals(title, img, category, description, created_by)
                              VALUES('${deal.title}', '${deal.img}', '${deal.category.toLowerCase()}', '${deal.description}', '${deal.created_by}'); END TRANSACTION;`
                            },

            deleteDeal: (id) => {

                              return `BEGIN; DELETE FROM knex_migrations.deals
                                        WHERE id=${id}; END TRANSACTION;`
                          },

            updateDeal: (deal) => {

                      return `BEGIN; UPDATE knex_migrations.deals
                             SET title='${deal.title}', img='${deal.img}', category='${deal.category}', description ='${deal.description}'
                              WHERE id =${deal.id}; END TRANSACTION;`
                       },

            findDealById : (id) =>{

                              return `SELECT * FROM knex_migrations.deals WHERE id = ${id};`

                          },

           
        

             

            findDealsBySearch : (search) =>{

                let str = '';
                for(let i=0; i< search.length; i++){
                str+= i===0? ` deals.title ~* '${search[i]}' OR description ~* '${search[i]}'`: ` OR deals.title ~* '${search[i]}' OR description ~* '${search[i]}'`
                }

              return `SELECT DISTINCT * FROM knex_migrations.deals WHERE ${str};`},


              displayDeals: (limit) =>{
                if(limit) return `SELECT * FROM knex_migrations.deals LIMIT ${limit};`
                return `SELECT * FROM knex_migrations.deals;`

               }, 


               updateViews(id, val){

                    console.log("trying to add" + val)
                    return  `BEGIN; UPDATE knex_migrations.deals
                      SET views=${val}
                      WHERE id =${id}; END TRANSACTION;`
                    },

              
              displayDealsByOrder: (category, sort, start) =>{

        

                switch(sort){

             
                case 1:

                  return "SELECT * FROM knex_migrations.deals " + (category==='all'? "": ` WHERE category='${category}' `)+ `ORDER BY views DESC LIMIT 6 OFFSET ${start};`;

                case 2:

                 return "SELECT * FROM knex_migrations.deals " + (category==='all'? "": ` WHERE category='${category}' `)+ `ORDER BY views ASC LIMIT 6 OFFSET ${start};`

                case 3:

                 return  "SELECT * FROM knex_migrations.deals " + (category==='all'? "": ` WHERE category='${category}' `)+ `ORDER BY creation_date ASC LIMIT 6 OFFSET ${start};`

               default:                 

                 return  "SELECT * FROM knex_migrations.deals " + (category==='all'? "": ` WHERE category='${category}' `)+ `ORDER BY creation_date DESC 
                  LIMIT 6 OFFSET ${start};`
  
                }

          },

          numberOfDealsByCategory : (category)=>{

            const str= (category==='all')?"":`WHERE category='${category}'`;

            return `SELECT COUNT(*) FROM knex_migrations.deals ${str};`
          }, 


          findDealsByUsername : (username) =>{

            return `SELECT * FROM knex_migrations.deals WHERE created_by = '${username}';`

          },

          getLastDeals: () =>{

          return `SELECT * FROM knex_migrations.deals ORDER BY creation_date DESC 
            LIMIT 30;`
          }

          
        }


          


              
              
            