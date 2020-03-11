const	express 		= require('express'),
		router			= express.Router(),
		bcrypt			= require('bcryptjs')





		const secret = process.env.SECRET;

const knex = require('../models/knex');
const userSchema = require('../models/schemas/user-schema/userSchema');
const loginSchema = require('../models/schemas/user-schema/loginSchema');
const tokenSchema = require('../models/schemas/user-schema/tokenSchema');
const delaSchema =  require('../models/schemas/deal-schema/dealSchema');



const addToken			= require('../helper-functions/addToken'); 
const addRegistrationToken = require('../helper-functions/addRegistrationToken')
const sendMail = require('../helper-functions/sendMail');


const isLoggedInMiddleware= require('../middlewares/isLoggedInMiddleware');
const verifyToken =  require('../middlewares/verifyToken')

const verifyTokenPassReset = verifyToken('password_tokens');
const verifyTokenRegistration= verifyToken('registration_tokens');

		// handles the signing part


router.post('/signin', (req, res)=>{
		
		const body= {

				username : req.sanitize(req.body.username),
				password :req.sanitize(req.body.password)
		}

		if(!body.username || !body.password) return res.status(500).json({"success":false, "msg":"empty password or login"})
		

		knex.raw(loginSchema.findLoginUser(body.username))
			
			.then( data => {

				console.log(data.rows)
				if(data.rows.length > 0){

					

					bcrypt.compare(body.password, data.rows[0].password)
					
					.then( async response => {
							

						
			
						if(response){


							tokenInfo = {secret: secret, table: "token_table", 
								type:"username",  username:body.username}
						
						const token = await addToken(tokenInfo);

						
						
								
							
							return res.status(200).cookie('token', token, { httpOnly: true })
							.json({"success":true, "username":body.username, "id":data.rows[0].id, "token":token });
						}

						else return res.status(400).json({"success":false, "msg":"your username or id is incorrect"})
					}).catch(err =>{

						console.log(err)
						return res.status(500).json({"success":false, "msg":"username or password invalid" })
					})
				}
					else throw new Error();
				})
				.catch( err => {

				
				return res.status(400).json({"success":false, "msg":"your username or id is incorrect"})
				})
})



			
			

router.post('/register', (req, res)=>{

	try{

	
		const users_entry = {
			name: req.sanitize(req.body.name),
			username: req.sanitize(req.body.username),
			email:req.sanitize(req.body.email)}
		

		bcrypt.hash(req.sanitize(req.body.password), 12, async function(err, hash){


				try{
					
					await knex.raw(userSchema.addUser(users_entry));
					data = await knex.raw(userSchema.findUser(users_entry.username, "username"));
					const users_login_entry ={
						id: data.rows[0].id,
						username: data.rows[0].username,
						password: hash }
					
					await knex.raw(loginSchema.addUserLogin(users_login_entry))

					return res.status(200).json({"success":true, "msg": users_entry.name +" was registered"})
				}
				
				catch(e){
					await knex.raw('ROLLBACK;');
					console.log(e)
					try{knex.raw(userSchema.deleteUser(users_entry.username));}
					catch(err){
						knex.raw('ROLLBACK;')
						console.log(err);
					}
					
					return res.status(400).json({"success":false, "msg": "there was an error"})
				}

		})

	}
	
	
		catch(e) {
		// If we get here, that means that neither the 'Old Books' catalogues insert,
		// nor any of the books inserts will have taken place.
			console.log(e);
		return res.status(500).json({"success": false, "msg": "your username or email is already used"})}
});




router.get('/checkToken', isLoggedInMiddleware, (req, res) => {

	console.log("we are in check token")
	res.status(200).send(req.user);
})

router.post('/logout', isLoggedInMiddleware, async (req, res)=>{
			const token = req.token;

				try{

					const DeletedToken = await knex.raw(tokenSchema.deleteToken(token))
						return res.status(200).json({"msg":" you were logout!"})
				}
				catch(e){
					
					console.log(e);
					return res.status(400).json({"msg":"there was a problem! login out :)" });

				}

});



router.get('/users', isLoggedInMiddleware, async (req, res)=>{

		if(!req.user.admin) return res.status(401).json({"err": "Vous n'avez pas une authorization"})

	try{

		const users = await knex.raw(userSchema.displayUsers())
		return res.status(200).json({"users":users.rows})
	}
	catch{

		return res.status(500).json({"err": "there was an issue getting the users"})
	}


})
router.post('/users/generate_registration_link', isLoggedInMiddleware, async (req, res)=>{

	if(!req.user.admin) return res.status(401).json({"err": "Vous n'avez pas une authorization"})

	// get the email

	const email  =  req.body.email;

	// create a token with that email

	try{

		const token  =  await addRegistrationToken({secret:secret, 
			table: 'registration_tokens',
			 username: email, 
			 type:'email'})

		const link  =  'http://localhost:3001/users/registration/'+token;

		//send a link to the email with the token

		sendMail({email:email, type:"registration", link:link}, (info, err)=>{

			if(err){

				throw new Error(err)
			}
			else{

				console.log(info);
				return res.status(200).send("the registration link was sent")
			}
		})
	}
	catch(e){

		console.log(e)
		return res.status(400).send("there was a problem sending the registration link");
	}
})





router.post('/users/reset_password', async(req, res) =>{



// get the emails

const email  =  req.body.email;

// create a token with that email

try{

	const user = await knex.raw(userSchema.findUser(email,'email'));

	if(user.rows.length ===1){
		
		const token  =  await addToken({secret:secret, 
			table: 'password_tokens',
			username: email, 
			type:'email'})

		const link  =  'http://localhost:3001/users/reset_password/'+token;

		//send a link to the email with the token

		sendMail({email:email, type:"reset_password", link:link}, (info, err)=>{

			if(err){

				throw new Error(err)
			}
			else{

				console.log(info);
				return res.status(200).send("the registration link was sent")
			}
		})

	}
	else{

		return res.status(404).send("this email is not registerd with tamani")
	}
}
catch(e){

	console.log(e)
	return res.status(400).send("there was a problem sending the registration link");
}

})

router.get('/users/:id', isLoggedInMiddleware, async (req, res)=>{
			try{
				if(req.user.admin || req.user.id === parseInt(req.params.id)) {
					const user = await knex.raw(userSchema.findUser(req.user.id,'id'));
					if(user.rows.length === 1) return res.status(200).send(user.rows[0]);
				}
				
				else throw new Error()
			}

			catch(e){

				return res.status(401).send("Vous n'avez pas la permission necessaire pour cette action")
			}
		
})




router.delete('/users/:id',isLoggedInMiddleware, async (req, res)=>{

	try{
			if(!req.user.admin) return res.status(401).json({"err": "Vous n'avez pas une authorization"})
		const response = await knex.raw(userSchema.deleteUser(req.body.username));
		return res.status(200).json({"success": true})

	}
	catch(e){
		await knex.raw('ROLLBACK;');
		return res.status(401).json({"success": false})
	}

})



router.put('/users/:id', isLoggedInMiddleware,  async (req, res)=>{

	const newUser ={

		username: req.sanitize(req.body.username),
		name: req.sanitize(req.body.name),
		email:req.sanitize(req.body.email),
	}

	try{

		if(req.user.id === parseInt(req.params.id)){
			await knex.raw(userSchema.updateUser(newUser));
			return res.status(200).send({"success":true, newUser});
		}
	}
	catch(e){
		await knex.raw('ROLLBACK;');
		return res.status(401).json({"success":false});

	}
})




//edit password

router.put('/users/:id/change_password',isLoggedInMiddleware, async (req, res)=>{

		const newPassword =req.sanitize(req.body.newPassword),
		oldPassword  = req.sanitize(req.body.oldPassword),
		id = req.user.id,
		username = req.user.username;

		if(id!== parseInt(req.params.id)) return res.status(401).send({msg: "Vous n'avez pas l'authorisation pour faire ce changement"})

	try{	
		

		const login = await knex.raw(loginSchema.findLoginPasswordById(id));

		const pass = await 	bcrypt.compare(oldPassword,login.rows[0].password);

		
		

		if(pass){



			bcrypt.hash(newPassword, 12, async function(err, hash){

					try{
						console.log(hash);
						await knex.raw(loginSchema.updateUserLogin(username, hash));
						return res.status(200).json({"success":true})
					}
					catch(e){
						await knex.raw('ROLLBACK;');
						throw new Error(e);
					}
				
				
				})

			
		}
		else{

			throw new Error("this an error lol");

		}


	}
	catch(e){

		console.log(e);

		return res.status(401).json({"success":false})


	}

})

router.get('/users/:id/deals', isLoggedInMiddleware, async (req, res)=>{

	const id =  parseInt(req.params.id);
	if(req.user.admin || req.query.id === id ){

		try{

			const deals  = await knex.raw(delaSchema.findDealsByUsername(req.user.username));
			
			console.log(deals)
			return res.status(200).send(deals.rows)


		}
		catch(e){

			return res.status(401).send("Il ya eu un problem en cherchant le plan")
		}


	}
	else{	

		return res.status(401).send("vous n'avez pas l'authorisation!")

	}


			
})




router.get('/users/reset_password/:token', verifyTokenPassReset,  (req, res)=>{

	return res.status(200).send({ user:req.user, msg:"you can now edit your password"})


})


router.get('/users/registration/:token', verifyTokenRegistration,  (req, res)=>{

	return res.status(200).send({ user:req.user, msg:"you can now register the user"})


})





		module.exports= router;