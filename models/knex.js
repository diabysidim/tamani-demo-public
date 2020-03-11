// Update with your config settings.





module.exports  =       require('knex')({
                    client: 'pg',
                    connection: {
                      connectionString: process.env.DATABASE_URL,
                      ssl:true
                    }
                  });
