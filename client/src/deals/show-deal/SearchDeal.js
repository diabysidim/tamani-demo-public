
import React, {Component} from 'react';

import '../../categories/category-deals/CategoryDeals.css';
import { Link , Redirect} from 'react-router-dom';
import RenderHTML from '../../utilities/RenderHTML';

class SearchDeal extends Component {

    constructor(props){
        super(props);
        this.state ={

            deals: []
        }
        
    }

		

		async componentDidMount(next){

            try{

				
                const response = await fetch('https://nandy-tamani-demo.herokuapp.com/deals/'+this.props.location.search, {method:"post"})
                const data =  await response.json();
                this.setState({deals:data})
                    
                
                }
                
        
                catch(e){
        
						alert("there was an error");
        
                         this.props.history.push('/')
                }
		}

		async componentWillReceiveProps(next){

            try{

				
                const response = await fetch('https://nandy-tamani-demo.herokuapp.com/deals/'+next.location.search, {method:"post"})
                const data =  await response.json();
                this.setState({deals:data})
                    
                
                }
                
        
                catch(e){
        
						alert("there was an error");
        
                         this.props.history.push('/')
                }
		}


		render(){

			return(<section className="search-container">						
				<h1>Voici les plans associes a {this.props.location.search.split("?search=").join('')} </h1>
				
							<div className='deals'> 
									
											{/* find all the deals in the category and display them*/}
									{ this.state.deals && this.state.deals.map(deal=>{

										return(
											

													<div className='deal'>
														
														
													<div className='img-div' style={ {backgroundImage: `url(${deal.img})`}}>

									
													</div>

													<div className='deal-right'>
															<Link to={`/deals/${deal.id}`}> {deal.title.toUpperCase()} </Link>					 		

																{/* number of words displayed in the description */}
															<RenderHTML description = {deal.description.split(" ").slice(0,30).join(' ')+"..."}/>
															<h5>{deal.creation_date.slice(0,10)}</h5>
													</div>

													</div>
											
											
											)})}
							</div>
					
				 </section>)

		}

}

export default SearchDeal;