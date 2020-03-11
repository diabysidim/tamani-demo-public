
	/* this component will display a menu containing th different categories
		on the site this is not scalable the max value is 14

		@props array of categories elements form Categories.js
	
	*/

    import React, {Component} from 'react';
    import {NavLink, Link} from 'react-router-dom';
    import './HomeMenu.css';
    import RenderHTML from '../../utilities/RenderHTML';
    
    
    class HomeMenu extends Component{
    
        render(){
    
            return( 	<section className='home-Menu-container'> 
    
                        <h2> Bienvenue sur Tamani ou vous pouvez trouver de bon plans </h2>
                    <div className="home-grid-container"> 
    
                                {/* get category name from the list and add it to the grid */}
                            {this.props.deals.map( deal =>{
    
                                return(<Link key= {this.props.deals.indexOf(deal)} to={`/deals/${deal.id}`} className={'home-box'+ this.props.deals.indexOf(deal)+ ' home-box'} style={{ backgroundImage: `url(${deal.img})` }}> 


                                
                                <h3> {deal.title.split(' ').slice(0,10).join(' ')+"..."} </h3>

                                <RenderHTML description={deal.description.split(' ').slice(0,30).join(' ')+"..."} />
                                
                                </Link>)
    
    
                            })}
    
    
    
                    </div>
    
    
    
                </section>)
        }
    }
    
    
    export default HomeMenu;