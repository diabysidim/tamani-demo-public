
// requiring modules 
const   express 		= require('express'),
		bodyParser 		= require('body-parser'),
		sanitizer       = require('express-sanitizer')
		methodOverride	= require('method-override');
const cookieParser 		= require('cookie-parser');
const path				= require('path');
const compression 		= require("compression");
const 	cors 			= require('cors')();

require('dotenv').config();

// const knex =  require('./models/knex');

// const tokenSchema = require('./models/schemas/user-schema/tokenSchema');
// const userSchema = require('./models/schemas/user-schema/userSchema');
// const loginSchema = require('./models/schemas/user-schema/loginSchema');

// const createTable= async () =>{
// 	try{

		// await knex.raw(userSchema.createUsersTable())
// 		await knex.raw(loginSchema.createUsersLoginTable())
// 		await knex.raw(tokenSchema.createTokenTable("token_table","username"))
// 		await knex.raw(tokenSchema.createTokenTable("password_tokens","email"))
// 		await knex.raw(tokenSchema.createUnreferencedTokenTable("registration_tokens","email"))
// 	}
// 	catch(e){

// 		console.log(e);
// 	}
// }

// createTable();


// const seedDb = require('./models/seeds/seedDb')();

console.log('requiring modules passed');
// requiring routes 

const		indexRoutes 	= require('./routes/deal');
const		userRoutes		= require('./routes/user');



// requiring models

// initializing the app

var 	app				= express();



// using the different modules

app.use(express.static('public'));
app.use('/image/', express.static('image'));
app.use(cors);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(sanitizer());
app.use(cookieParser());


console.log('using the different modules passed');

//use models
// app.use(Categories);

// using the routes 

app.use(indexRoutes);
app.use(userRoutes);




// setting the view engine 

app.set('view engine', 'ejs');

// create a port 

var		port		= process.env.PORT || 3001;

app.listen(port, ()=>{

	console.log("server started");
})