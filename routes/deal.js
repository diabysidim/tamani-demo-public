const 	express 		= require('express'),
		router			= express.Router();
		
		
const categorySchema = require('../models/schemas/deal-schema/categorySchema');
const dealSchema = require('../models/schemas/deal-schema/dealSchema');	
const knex       = require('../models/knex');
const fs = require('fs');
const upload = require('../middlewares/upload');

const isLoggedIn = require('../middlewares/isLoggedInMiddleware');


			


	



	



// delete an image from the image folder

const deleteImg = (image) =>{


		
			try{
				

				fs.unlinkSync(image);
			}
			catch(err){

				console.log(err);
			}

	};

// show categories 

router.get('/categories', async (req, res) =>{
			
		const Categories  = await knex.raw(categorySchema.displayCategories());

		categoriesArray = Categories.rows.map( category => (category = category.category));
			
		res.json(categoriesArray);
	})	
	
// create the link for page navigator

const createPageLinks = (count, arr2, category) =>{

	for(let i=0; i< Math.ceil(count/6); i++){
			
		console.log(i)
		arr2.push('/categories/'+category + '/' + (i+1));


	}
		}


// category with page 
router.get('/categories/:category/:page/', async (req, res) =>{




		
		let page = parseInt(req.params.page)|| 0;

		let  start = (page - 1 ) * 6;

		console.log("Start is " + start)


		const sort = parseInt(req.query.sort);

		const category  = req.params.category;

		const Schema = dealSchema.displayDealsByOrder(category, sort, start);
		const countSchema = dealSchema.numberOfDealsByCategory(category)
		console.log(dealSchema.numberOfDealsByCategory(category))
		let arr, count;

		try{
			arr = await knex.raw(Schema)
			
			
			count = await knex.raw(countSchema);

		}
		catch(e){

			console.log(e);
			return res.status(404).json({"error": "Cette page n'existe pas"});
		}
		let arr2 =[]



		createPageLinks(count.rows[0].count, arr2, category );

	return res.status(200).send([arr.rows, arr2 ])

	});

		

	
	
	
		


	/******************** Handle Deals  *************/

// show a deal

router.post('/deals/', async (req, res)=>{
		
		const newArray = req.query.search.split(' ').map(word => req.sanitize(word))


		try{

			const deals = await knex.raw(dealSchema.findDealsBySearch(newArray)).debug()

			return res.status(200).send(deals.rows);

		}
		catch(e){
				console.log(e);

				return res.status(401).send({success:false, msg:"Il ya une erreur"})
		}
})
router.get('/deals/:id', async (req, res) =>{

	const id  =  req.params.id;
	
		let arr, viewUpdate;

		try{
			arr= await knex.raw(dealSchema.findDealById(id));

			viewUpdate= await knex.raw(dealSchema.updateViews(id , arr.rows[0].views+1))
		}
		catch(e){

			await knex.raw('ROLLBACK;');
			console.log(e);
			return res.status(404).json({"error": "Cette page n'existe pas"});
		}
		

	return res.status(200).json(arr.rows);

	
})



// stting up multer 




// create deal

router.post('/deals/new',upload.single('dealImage'), isLoggedIn, async (req, res, next) =>{


	const category = req.sanitize(req.body.category).split("amp;").join('');
	 console.log(req.body.description)
	
	let newDeal = {img: `https://nandy-tamani-demo.herokuapp.com/image/${req.file.filename}`,
		title: req.sanitize(req.body.title),			
		category: category,
		description:req.sanitize( req.body.description),
		created_by: req.user.username
				};	

	
	let arr , response;

	try{

		arr= await knex.raw(dealSchema.addDeal(newDeal));
		response  = await knex.raw(dealSchema.displayDealsByOrder(newDeal.category, 1, 0));


	}
	catch(e){

		console.log(e);

		await knex.raw('ROLLBACK;')

		return res.status(500).json({"error": "il y a eu un problem en creant le plan"});
	}
	
	console.log(response.rows[0])
	
	return res.status(200).json(response.rows[0]);
});

// delete deal				

router.delete('/deals/:id', async (req, res)=>{

	const newDeals=[];
	let success =false;
	let msg;
	const id= parseInt(req.params.id)
	let response, img;

	try{
		
		img = await knex.raw(dealSchema.findDealById(id));

		if(!req.user.admin || img.rows[0].created_by === req.user.username ) return res.status(401).json({"err": "Vous n'avez pas une authorization"})
		response= await knex.raw(dealSchema.deleteDeal(id));
		if(img.rows.length <= 1) success = true;
		msg=" le plan a ete supprime";
	
	}
	catch(e){
		
		await knex.raw('ROLLBACK;');
		console.log(e);
		return res.status(400).json({"error": "there was a probleme deleting this deal"});
	}

	if (success) {
		console.log("deletin" + img.rows[0].img );
		deleteImg(img.rows[0].img.slice(40));
	}

	return	success?  res.json({"success":success, "msg":msg }): 
					res.status(200).json({"success":success, "msg":"thre was an issue deleting the deal"})

})

//Edit deals 

router.put('/deals/:id', upload.single('dealImage'), async (req, res)=>{

	
	let newImage = (typeof req.file === 'object')? `https://nandy-tamani-demo.herokuapp.com/image/${req.file.filename}`: req.body.dealImage;
	
	const category = req.sanitize(req.body.category).split("amp;").join('');

	let newDeal = {
			img:newImage ,
			id: parseInt( req.sanitize(req.body.id)),
			title:  req.sanitize(req.body.title),			
			category:  category,
			description:  req.sanitize(req.body.description)
			}	

		
			

		let arr,img ;

			try{

				img = await knex.raw(dealSchema.findDealById(newDeal.id));

				if(!req.user.admin || img.rows[0].created_by === req.user.username ) return res.status(401).json({"err": "Vous n'avez pas une authorization"})
				if(typeof req.file === 'object' && img.rows[0].img !== newImage) {

					console.log("deletin" + img.rows[0].img );
					deleteImg(img.rows[0].img.slice(40));
				}


				arr= await knex.raw(dealSchema.updateDeal(newDeal));				


			}
			catch(e){
				
				await knex.raw('ROLLBACK;')
				console.log(e);
				return res.status(404).json({"error": "il y a eu un problem en modifiant le plan"});
			}
			
						
						
	return res.status(200).json({"success":true, "msg": "the deal was modified"})
											



})


// get last deals

router.get('/lastDeals', async (req, res)=>{

	try{

		deals = await knex.raw(dealSchema.getLastDeals())
		return res.status(200).send(deals.rows)

	}
	catch(e){

		return res.status(200).send("there was a problem getting the deals")
	}

	res.json(lastDeals)

})


		



		




module.exports = router;