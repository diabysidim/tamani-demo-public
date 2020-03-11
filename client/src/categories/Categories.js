

    /* this component get the categories and feed them to the CategoryMenu
        @props = an list of categories
    */
import React from 'react';
import CategoryMenu from './category-menu/CategoryMenu';
import Loading from '../utilities/loading/Loading';





class Categories extends React.Component{

    constructor(props){

        super(props);

        this.state = {

            categories : [],
            error: false,
            loading:true,
        }
    }

    componentDidMount(){

        try{

            let Response = fetch('https://nandy-tamani-demo.herokuapp.com/categories')
            .then(response => {
                    if(response.status===200) return response.json()
                    else throw new Error()})
            .then(data => {this.setState({
                categories: data,
                loading:false
            })})

        }
        catch(e){

            this.setState({
                error:true,
            })
        }

       
       
    }

        render(){

            return <div className="Categories-container">
                
                 { this.state.error? <div> 404 page not found</div>: 
                    <div>
                     
                    {this.state.loading?<Loading/>:<CategoryMenu categories={this.state.categories}/>  }   
                
                    </div> }
                </div>
        }

}

export default Categories;