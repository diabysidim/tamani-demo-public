/** this component shows 3 deals in a list that can be move arround 
 * @props = list of deals
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import  './Banner.css';
import RenderHTML from '../RenderHTML';


class Banner extends Component{



		constructor(props){
				
				super(props);

				this.state ={
					leftDeals:0,
					rightDeals:1,

				}

				this.handleLeftClick= this.handleLeftClick.bind(this);
				this.handleRightClick= this.handleRightClick.bind(this);

			
		}



	

	


		

	handleLeftClick(e){
		
			this.setState((st, props) => {

					if(st.leftDeals > 0){

						return ({
				leftDeals: st.leftDeals-1,
				rightDeals: st.rightDeals-1,
			})
		}
			
	})}


		


	handleRightClick(e){
		e.preventDefault();
		this.setState((st,props) => {

			if(st.rightDeals < props.ldeals.length){		


				return ({
				leftDeals: st.leftDeals+1,
				rightDeals: st.rightDeals+1,
			})

					
			
			
			}

		})	}

		




	render(){


			return(<div id='banner'>

				

				<div>
					
					<div className='banner-container'>

						<div className={`banner-left-btn ${ this.state.leftDeals > 0 ?  '' : 'desactivated' }`} 
						onClick={this.handleLeftClick}> <span className='banner-left-btn-arrow'></span> </div>
					{this.props.ldeals.slice(this.state.leftDeals, this.state.rightDeals).map( deal => { 

						return(

							
							

						 		<div key={this.props.ldeals.indexOf(deal)} className="banner-element">

						 			<img src={deal.img}/>

						 			<h3><Link to={`/deals/${deal.id}`}> {deal.title.toUpperCase().split(' ').slice(0,10).join(' ')}</Link></h3>
						 		
						 			
						 		
						 			<RenderHTML description={deal.description.split(' ').slice(0,30).join(' ')+"..."} />

						 		</div>

						 		
						 	)

						 })}

							<div className={`banner-right-btn ${ this.state.rightDeals < this.props.ldeals.length ?  '' : 'desactivated' }`}  
							onClick={this.handleRightClick}><span className='banner-right-btn-arrow'></span> </div>
						</div>

				</div>



			</div>)



	}

}

export default Banner;