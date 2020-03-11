/** this is a simple navbar */
import React, {Component} from 'react';
import {NavLink, withRouter, Redirect} from 'react-router-dom';
import './Navbar.css';
class Navbar extends Component{

	constructor(props){
			super(props);
			this.state ={

				search: '',
			}
			this.handleSearch =  this.handleSearch.bind(this);
			this.handleChange =  this.handleChange.bind(this);
	}

		handleChange(e){

			this.setState({
				search : e.target.value,
			})
		}

		handleSearch(e){
			
			e.preventDefault();
			
			this.props.history.push('/deals?search='+this.state.search)
	
			
		}


		render(){


			return (	
					<div className='nav-global'>

						<div className='nav-container'>
							<div className='first-row'>
								
								<NavLink to='/' className='brand'>Tamani</NavLink>
								<form onSubmit={this.handleSearch}>

									<input className='nav-search' onChange={this.handleChange}/> 
									<button><i className="fas fa-search"></i></button> 
								</form>



							</div>

							<div className="second-row">
								<nav className="">
									<ul> 
							
										

											<li><NavLink to={`/categories`} activeClassName="clicked"> Toutes les categauries</NavLink> </li> 

											 <li><NavLink to={`/deals/lastDeals`} activeClassName="clicked"> Tous les derniers plans </NavLink></li>

											 <li><NavLink  to={`/categories/all/1`} activeClassName="clicked"> Tous les plans </NavLink></li>
											 

									

							
									</ul> 
								</nav> 
							</div>
									
						</div>
					</div>)


		}


}

export default withRouter(Navbar);