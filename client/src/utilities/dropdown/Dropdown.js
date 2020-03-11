/** simple dropdown button 
 * @props  width, 
 * list of items in the dropdown
 */
import React, {Component} from 'react';
import './Dropdown.css'



class Dropdown extends Component{

	constructor(props){

		super(props);

		this.state ={
			...this.props,
			items: this.props.items || [],
			showItems: false,
			selectedItem: this.props.items && this.props.items[0]

		}

	}

	dropdown = () => {

		this.setState(prevState => ({

			showItems: !prevState.showItems, }))
	}

	selectItem =(name, item) => {
		
		
		
		this.setState ({

			selectedItem: item,
			showItems: false,
		

	})

	this.props.getSelectedItemDropdown(name, item.id);

}
	


	render(){

		return( 
		

				<div className='dropdown-box' style={ {width: this.state.width || 180}}>
					<div className='dropdown-container'>

						<div className='selectedItem'>
								{this.state.selectedItem.value}
						</div>


						<div className='dropdown--arrow'>
							<span className={`${this.state.showItems? 'dropdown--arrow-up' : 'dropdown--arrow-down'}`} 
									onClick={this.dropdown}> </span>
						</div>

						<div style={{display: this.state.showItems? 'block' : 'none'}} 
						className='dropdown--items'> {this.state.items.map(item => 
							<div key={item.id} onClick={() =>this.selectItem(this.props.name, item)}> {item.value} </div>)} 
							</div>
					
					</div>

					<input type='hidden' value={this.state.selectedItem.id} name={this.state.name}/>
				</div>
			)
					
	}
	
}

export default Dropdown;