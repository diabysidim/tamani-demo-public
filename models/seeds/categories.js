

const categorySchema = require('../categorySchema');

const knex = require('../../knex')

const categories		= [

	'auto & moto', 
	'beaute & soin',
	'decoration', 
	'high tech',
	'jeux & jouets',
	'livres',
	'maison',
	'telephonie',
	'puericulture',
	'restaurants',
	'supermarches',
	'mode',
	'transport',
	'voyage & loisirs',
	'all'
		];

		


const seedCategories = async () =>{

	try{
		const createTable = await knex.raw(categorySchema.createCategoriesTable());
		for(category of categories ) await knex.raw(categorySchema.addCategory(category));
	}
	catch(e){
		await knex.raw('ROLLBACK;');
		console.log(e)
	}
	

}

	









module.exports= seedCategories;