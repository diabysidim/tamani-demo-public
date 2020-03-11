 
import React from 'react';
import Category from './categories/Category';
import Home from './home/Home';
import Deal from './deals/show-deal/Deal';
import {Route, Switch, NavLink, Redirect, useLocation} from 'react-router-dom';
import CreateDeal from './deals/create-deal/CreateDeal';
import Signin from './users/signin/Signin';
import Auth from './users/Auth';
import Signout from './users/Signout';
import Register from './users/register/Register';
import Admin from './users/admin/Admin';
import Categories from './categories/Categories';
import EditDeal from './deals/edit-deal/EditDeal';
import Users from './users/manage-users/Users';
import User from './users/manage-users/User';
import UpdateUser from './users/manage-users/UpdateUser';
import UpdatePassword from './users/manage-users/UpdatePassword';
import UserDeals from './users/manage-users/UserDeals';
import UserRegistrationGen from "./users/manage-users/UserRegistrationGen";
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import SearchDeal from './deals/show-deal/SearchDeal';

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


 class Routes extends React.Component{
			 
	


 		render(){

			

 			return( <div>
						<Navbar/>
 						<Switch>
				
							<Route exact path='/' exact render={()=> <Home/>} />	

							<Route path='/categories/:category/:page' exact render={(routeProps)=> 
								<Category category={routeProps.match.params.category} 
											page={routeProps.match.params.page} categories={categories}/>} />

							<Route path='/categories' render={()=><Categories 
									categories={categories} />} />

							<Route exact path='/deals/:id/edit'  render={(routeProps)=>	{

								const PrivateRoute = Auth(EditDeal)

								return <PrivateRoute {... routeProps } dealId={routeProps.match.params.id} 
								categories={categories} /> } 

							}		/>
							
							<Route exact path='/deals/lastDeals'  render={(routeProps)=> 							
								<Home {... routeProps}  /> } />
								
							<Route exact path='/deals/:id'  render={(routeProps)=> 							
								<Deal {... routeProps} dealId={ parseInt(routeProps.match.params.id)} key={parseInt(routeProps.match.params.id)}  /> } />
								

								<Route exact path='/deals'  render={(routeProps)=> 							
									<SearchDeal {... routeProps}  /> } />

							<Route exact path='/users/:id/deals/new'  render={(routeProps)=> {

								const PrivateRoute = Auth(CreateDeal)

								return <PrivateRoute {...routeProps} categories={categories} /> } } />

							<Route exact path='/users/:id/deals' render ={(routeProps) => {
								
								const PrivateRoute = Auth(UserDeals)
								return <PrivateRoute {... routeProps}  /> } }/>						
							
							
							
							<Route exact path='/users/:id/edit' render ={(routeProps) => {
								
								const PrivateRoute = Auth(UpdateUser)
								return <PrivateRoute {... routeProps} /> } }/>

							<Route exact path='/users/:id/change_password' render ={(routeProps) => {
								
								const PrivateRoute = Auth(UpdatePassword)
								return <PrivateRoute {... routeProps} /> } }/>

							<Route exact path='/users/:id/profil' render ={(routeProps) => {
								
								const PrivateRoute = Auth(User)
								return <PrivateRoute {... routeProps} /> } }/>

								

							<Route exact path='/users' 
									render={ (routeProps)=> {
										const PrivateRoute = Auth(Users)
							 	return <PrivateRoute {...routeProps} />} }/>
							
								
										
							
							<Route path='/users/:id/register'  render={ (routeProps)=> {
								const PrivateRoute = Auth(Register)
							 	return <PrivateRoute {...routeProps} />} }/>

							
							
							<Route path='/users/generate_registration_link' 						
						
								render={(routeProps)=>{ 
									const PrivateRoute = Auth(UserRegistrationGen)
									return <PrivateRoute {...routeProps} />} }/>
								
							<Route path='/users/:id' 						
						
							render={(routeProps)=>{ 
								const PrivateRoute = Auth(Admin)
								return <PrivateRoute {...routeProps} />} }/>
								
							<Route exact path='/signin'  render={(routeProps)=>{
							
							return <Signin {...routeProps}  />}} />


							<Route exact path='/logout'  render={(routeProps)=>{
								const PrivateRoute =Auth(Signout)
								return <PrivateRoute {...routeProps}  />}} />
							
							

							<Redirect to='/'/>
				
						</Switch>
						<Footer />
 					</div>)
 		}



 }

 export default Routes;