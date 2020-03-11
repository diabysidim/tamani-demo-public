/* 
	this component help display a deal
	@props deal 
	@props list of similar deals and porpose it to the user
*/ 
import React from 'react';
import {Link} from 'react-router-dom';
import Banner from '../../utilities/banner/Banner';
import Delete from '../../utilities/crud/Delete';
import Update from '../../utilities/crud/Update';
import './Deal.css';
import Loading from '../../utilities/loading/Loading';

class Deal extends React.Component{

	constructor(props) {
		super(props)
		
		this.state = { deal:undefined, deals:[], error: false}
		this.goBack = this.goBack.bind(this);
		this.getDeal =  this.getDeal.bind(this);
		this.handleError = this.handleError.bind(this);
		this.scroll = this.scroll.bind(this);
		
		
	}

	scroll(){

		document.querySelector('.deal-social').scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	async getDeal (){

		try{
			const response = await fetch('https://nandy-tamani-demo.herokuapp.com/deals/' + this.props.dealId);

			if(response.status===200){

				const data= await response.json();
				
				this.setState({deal:data[0], deals: data[1]})
				

			}

			else{

				throw new Error(response.json().error)
			}
		
		
		}
		catch(e){

				this.setState({ error:true})
				
		}

	}

	handleError(){

		return <div> 404 this page does not exist</div>;
		
	}

	componentDidUpdate(){

		// this.scroll()
	}

	
	componentDidMount() {


			this.getDeal();
			
			

	
			
											
	}

	goBack(){

		return this.props.history.goBack();
	}



	

	


	render(){


		return ( this.state.error? this.handleError():

		<div className="deal-wrapper">
			
			{ (this.state.deal)?
			<div className='deal-container'> 



				<div className="deal-social">
					{/*links to social media posts go here	*/}
					<a className='deal-social-facebook' href="#"> <i class="fab fa-facebook"> </i> Partager </a>
					<a className='deal-social-twitter' href="#"> <i class="fab fa-twitter"></i> Tweeter </a>
 				</div>	 
				<div className='deal-path'>
					{/* help the user navigates*/}

					<Link to='/'>ACCUEIL</Link> <span className="separator"></span>
					<Link to= '/categories/all/1'>Tous les plans</Link> <span className="separator"></span>
					<Link to= {'/categories/'+this.state.deal.category +'/1'}>{this.state.deal.category}</Link><span className="separator"></span>
					<Link> {this.state.deal.title}</Link>

				 </div>	
				<div className='deal-post-container'>

					<h1>{this.state.deal.title.toUpperCase()}</h1>

					{/*the post goes here*/}

					{/*{ if(this.state.deal.img){*/}

					{/*place where the picture will go*/}

					<div className='deal-post-container-photo' style={{backgroundImage:`url(${this.state.deal.img})`}}></div>


					<div className='deal-post-text' dangerouslySetInnerHTML={{__html: this.state.deal.description}}/>
						{/*the post will go here */}

						
	 				
				</div>

				{ this.props.user && this.props.user.username&& <div className="crud">
						<Delete id={this.state.deal.id} goback={this.goBack} />
						
						<Update path={"/deals/"+this.state.deal.id} />
				
				</div>}

	 			{/*<div className="deal-suggestion"> 

				 		
					<h4> VOUS AIMEREZ CERTAINEMENT CES OFFRES </h4>
					{this.state.deals?<Banner ldeals={this.state.deals}/> : null}
	 
			</div>*/}
	 			


			</div>: 
				
				<div>
					<Loading/>
				</div>}

		 </div>)
	}
}

		
export default Deal;