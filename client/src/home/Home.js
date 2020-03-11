import React, {Component} from 'react';
import Banner from '../utilities/banner/Banner';
import './Home.css'
import HomeMenu from './home-menu/HomeMenu';
import Loading from '../utilities/loading/Loading';



class Home extends Component{

	constructor(props){

		super(props);
		this.state = {

			lastDeals: []
		}
	}

	componentDidMount(){

		const response= fetch('https://nandy-tamani-demo.herokuapp.com/lastDeals').then( res=> (res.json())).then(data =>{

			this.setState({
			 lastDeals:data
			})
		})

	}

	render(){


		console.log(this.state.lastDeals.length > 0)

		return(

			(this.state.lastDeals.length > 0)?	<div id="home-container">
										<h2>Voici quelques offres exceptionelles</h2>
										<Banner ldeals={this.state.lastDeals.slice(1, 4)} size={window.innerWidth}/> 
										<HomeMenu deals ={this.state.lastDeals.slice(4, 30)} />
									</div>:
				<div>

					<Loading/>
				</div>		
			)
	}
}

export default Home;