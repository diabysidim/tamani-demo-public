
/* container to hold all the component 

	This component will look for a category in the database and display 
	the deals related to it. 

	@props= category name for url --- routeProps.match.params.category
	@props= a list of deals form category.js

*/

import React, {Component} from 'react';

import './CategoryDeals.css';
import { Link } from 'react-router-dom';
import RenderHTML from '../../utilities/RenderHTML';

class CategoryDeals extends Component {

		constructor(props) {
			super(props);
			
			this.state = {

				category:this.props.category,
				deals: this.props.deals
			}

		}
		

		

		render(){

			return(<section>						
							
				
							<div className='deals'> 
									
											{/* find all the deals in the category and display them*/}
									{ this.state.deals && this.state.deals.map(deal=>{

										return(<div key={this.state.deals.indexOf(deal)} className='deal'>

												<div className='img-div' style={ {backgroundImage: `url(${deal.img})`}}>

								
												</div>

												<div className='deal-right'>
						 								<Link to={`/deals/${deal.id}`}> {deal.title.toUpperCase()} </Link>					 		

														 	{/* number of words displayed in the description */}
						 								<RenderHTML description = {deal.description.split(" ").slice(0,30).join(' ')+"..."}/>
						 								<h5>{deal.creation_date.slice(0,10)}</h5>
						 						</div>

											</div>)})}
							</div>
					
				 </section>)

		}

}

export default CategoryDeals;