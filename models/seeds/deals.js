
    const dealSchema = require('../dealSchema');
    const knex = require('../../knex');

	const deals =[
		
		{
			id:1,
			img:'https://images.unsplash.com/photo-1558980664-2506fca6bfc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			title: 'Belle MOTO',
			category:"auto & moto",
			description: 'OSTON--(BUSINESS WIRE)--What are the best Boost Mobile Cyber Monday 2019 deals? Sales experts at Retail Egg track Boost Mobile prices and have rounded'
		},

		{	id:2,
			img:'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
			title: 'Moto de lux',
			category:'auto & moto',
			description: "L’enseigne Carrefour vous donne une bonne raison de pousser les portes de ses hypermarchés aujourd’hui et de filer sur son site Internet pour faire une commande dans ses Drive : 120 € offerts sur la console Nintendo Switch, cela donne à réfléchir !" +
			"Uniquement ce lundi 20 janvier 2020, venez acheter la console Switch : au passage en caisse, vous obtiendrez deux bons d’achat d’une valeur de 60 € chacun. Ces bons sont valables dans les hypermarchés en France métropolitaine et en Corse,"+
			"entre le mardi 21 janvier et le lundi 3 février 2020. Ils sont utilisables en une seule fois dans tous les rayons hors drive, carburant et services."+	"Si l’achat de la console Nintendo Switch s’opère en drive, en livraison à domicile, en retrait magasin ou en point relais,"+
			"vous recevrez un seul code promo de 120 € par email le vendredi 24 janvier 2020. Il sera valable jusqu’au 7 février (ou le 31 janvier sur l’espace jouetsdenoel.carrefour.fr)."
			

		},

		{	id:3,
			img:'https://images.unsplash.com/photo-1580628646345-66877239693a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			title: 'Maison avec vue sur la mer',
			category:'maison',
			description: "L’enseigne Carrefour vous donne une bonne raison de pousser les portes de ses hypermarchés aujourd’hui et de filer sur son site Internet pour faire une commande dans ses Drive : 120 € offerts sur la console Nintendo Switch, cela donne à réfléchir !" +
			"Uniquement ce lundi 20 janvier 2020, venez acheter la console Switch : au passage en caisse, vous obtiendrez deux bons d’achat d’une valeur de 60 € chacun. Ces bons sont valables dans les hypermarchés en France métropolitaine et en Corse,"+
			"entre le mardi 21 janvier et le lundi 3 février 2020. Ils sont utilisables en une seule fois dans tous les rayons hors drive, carburant et services."+	"Si l’achat de la console Nintendo Switch s’opère en drive, en livraison à domicile, en retrait magasin ou en point relais,"+
			"vous recevrez un seul code promo de 120 € par email le vendredi 24 janvier 2020. Il sera valable jusqu’au 7 février (ou le 31 janvier sur l’espace jouetsdenoel.carrefour.fr)."
			

		},
		{	id:4,
			img:'https://images.unsplash.com/photo-1580615633399-a69c661568c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			title: 'Fast food promo',
			category:'Restaurants',
			description: "L’enseigne Carrefour vous donne une bonne raison de pousser les portes de ses hypermarchés aujourd’hui et de filer sur son site Internet pour faire une commande dans ses Drive : 120 € offerts sur la console Nintendo Switch, cela donne à réfléchir !" +
			"Uniquement ce lundi 20 janvier 2020, venez acheter la console Switch : au passage en caisse, vous obtiendrez deux bons d’achat d’une valeur de 60 € chacun. Ces bons sont valables dans les hypermarchés en France métropolitaine et en Corse,"+
			"entre le mardi 21 janvier et le lundi 3 février 2020. Ils sont utilisables en une seule fois dans tous les rayons hors drive, carburant et services."+	"Si l’achat de la console Nintendo Switch s’opère en drive, en livraison à domicile, en retrait magasin ou en point relais,"+
			"vous recevrez un seul code promo de 120 € par email le vendredi 24 janvier 2020. Il sera valable jusqu’au 7 février (ou le 31 janvier sur l’espace jouetsdenoel.carrefour.fr)."
			

		},
		{	id:6,
			img:'https://images.unsplash.com/photo-1562887009-d33955afc319?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
			title: 'Rouge a levre',			
			category:'beaute & soin',
			description: "L’enseigne Carrefour vous donne une bonne raison de pousser les portes de ses hypermarchés aujourd’hui et de filer sur son site Internet pour faire une commande dans ses Drive : 120 € offerts sur la console Nintendo Switch, cela donne à réfléchir !" +
			"Uniquement ce lundi 20 janvier 2020, venez acheter la console Switch : au passage en caisse, vous obtiendrez deux bons d’achat d’une valeur de 60 € chacun. Ces bons sont valables dans les hypermarchés en France métropolitaine et en Corse,"+
			"entre le mardi 21 janvier et le lundi 3 février 2020. Ils sont utilisables en une seule fois dans tous les rayons hors drive, carburant et services."+	"Si l’achat de la console Nintendo Switch s’opère en drive, en livraison à domicile, en retrait magasin ou en point relais,"+
			"vous recevrez un seul code promo de 120 € par email le vendredi 24 janvier 2020. Il sera valable jusqu’au 7 février (ou le 31 janvier sur l’espace jouetsdenoel.carrefour.fr)."
			

		},
		

	];

const seedDeals = async () =>{
	try{
		const createTable = await knex.raw(dealSchema.createDealsTable());
		for(deal of deals ) {let ndeal =await knex.raw(dealSchema.addDeal(deal));}
	}
	catch(e){

		console.log(e);
	}
   

}

	

module.exports = seedDeals;
