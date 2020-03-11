
	/* this component will display a menu containing th different categories
		on the site this is not scalable the max value is 14

		@props array of categories elements form Categories.js
	
	*/

import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './CategoryMenu.css';


class CategoryMenu extends Component{

	render(){

		return( 	<section className='Menu-container'> 

					<h2> Choisissez une categorie!! </h2>
				<div className="grid-container"> 

							{/* get category name from the list and add it to the grid */}
						{this.props.categories.map( category =>{

								
							return(<div key={this.props.categories.indexOf(category)} className={'box'+ this.props.categories.indexOf(category)+ ' box'}>
							 <NavLink to={`/categories/${category.toLowerCase()}/1`}> {category.toUpperCase()}
							  </NavLink> </div>)


						})}	



				</div>



			</section>)
	}
}


export default CategoryMenu;