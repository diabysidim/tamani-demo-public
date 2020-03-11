/* This component display a category
	it calls categoryDeals
	@props a list of deals and the category from params.category */
import React from 'react';
import CategoryDeals from './category-deals/CategoryDeals';
import Dropdown from '../utilities/dropdown/Dropdown';
import PageNav from '../utilities/page-nav/PageNav';
import Loading from '../utilities/loading/Loading';
import './Category.css';


class Category extends React.Component{

		constructor(props){

			super(props);

			this.state = {

				deals: [], 
				pageNums: [],
				sort:4,

				loading: true,
				error:false,
				
				}
				this.getSelectedItemDropdown = this.getSelectedItemDropdown.bind(this);
				this.sortDeals = this.sortDeals.bind(this);

		}

		componentDidMount(){
			
			this.sortDeals(this.props, this.state.sort);

		}

		componentWillReceiveProps(nextProps) {

			this.sortDeals(nextProps, this.state.sort );
		}

		async getSelectedItemDropdown(name, id){

			this.setState({

				[name]: id
			})

			await this.sortDeals(this.props, id);

		


		}

		
		sortDeals(props, sort){

			if(this.props.categories.includes(this.props.category)){
				const response= fetch(`https://nandy-tamani-demo.herokuapp.com/categories/${props.category}/${props.page}/?&sort=${sort}`)
		
						.then(res =>res.json())				
						.then( data => {
							
							
							this.setState({
								deals : data[0],
								error:false,
								loading:false,
								pageNums: data[1]
							})})
					.then(()=> {
						if(document.querySelector('#deal-category-container'))
						document.querySelector('#deal-category-container')
					.scrollIntoView({ behavior: 'smooth', block: 'start' })})
					}
					else{
		
						this.setState({error:true})
					}


		}



		render(){

			return (
				this.state.error? <div> 404 page not found </div>:
				<div>
						{
							(this.state.loading)? 
								
								<div> <Loading/> </div>
								
							:

								<div id='deal-category-container'>

									{/* display the category name */}
									<h1>{this.props.category.toUpperCase() || `Tous les plans`}</h1>
									
									<form className='btn-sort'> 
										
									{/* dropdown buttons controlling the sorting of the deals */}
										<div className='first-dropdown'>

											{/*<Dropdown
													width={170}
													name={'date'}
													items={[{value: 'Les plus recents', id: 1},
													{value: 'Les plus anciens', id: 2}]} 
											getSelectedItemDropdown ={this.getSelectedItemDropdown}/>*/}



											<Dropdown
													width={210}
													name= {'sort'}
													items={[{value: 'Les plus recents', id: 4}, 
													{value: 'Les plus populaires', id: 1 },
													{value: 'Les moins populaires', id: 2},
													{value: 'Les plus anciens', id: 3},
													]} 
													getSelectedItemDropdown ={this.getSelectedItemDropdown}/>

										</div>

										

										</form>
									
										
								{
									
								this.state.deals.length > 0? <CategoryDeals deals={this.state.deals} 
												category={this.props.category} key={ this.state.deals[0].id}/>:
											undefined
												
								}

								<PageNav path={this.props.category}
								pageNums={this.state.pageNums} />
										
								</div>

							 
						}


				</div>
				
				
				
				)

		}


}


export default Category;