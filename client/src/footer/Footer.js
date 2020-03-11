
/* this is a simple footer*/
import React, {Component} from 'react';
import './footer.css';
import Signout from '../users/Signout';
import { Link } from 'react-router-dom';
import Categories from '../categories/Categories';

class Footer extends Component{

		constructor(props){

			super(props);
			this.state ={

				user: null,
			}
			this.localStorageUpdated = this.localStorageUpdated.bind(this)
		}
		

		componentWillMount(){

			window.addEventListener('storage', this.localStorageUpdated)
			console.log("did mount")
			
		}

		
		localStorageUpdated() {

			console.log("new item")

			if(localStorage.getItem("user")) this.setState({
				user: JSON.parse(localStorage.getItem("user"))
			})
		
		}

		
		render(){

				

				return(<section id='footer'> 

						<div className='footer-brand'> 

							<img src={require('../../public/tamani-logo.png')}/>
							<p> Lorem ipsum dolor sit amet,	consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

						 </div> 
						<div className='footer-info'>

							<div className='footer-social'>

								<Link to="#"> <i className="fab fa-facebook"></i></Link>
								<Link to="#"><i className="fab fa-instagram" ></i></Link>
								<Link to="#"><i className="fab fa-twitter"></i></Link>

							</div>

							<div className='footer-links'>

								<Link to='/contact'> Nous contactez </Link>
								<Link to='/legal'> Legal </Link>
								{this.state.user && this.state.user.username? <Link to='/logout'>Logout</Link>: <Link to='/signin'>Se connecter</Link>}
								{this.state.user && this.state.user.username? <Link to={'/users/'+this.state.user.id}>Profil</Link>: undefined}
							</div>


								
						</div>


					</section>)
		}


}

export default Footer;