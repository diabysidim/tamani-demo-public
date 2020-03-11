
import React from 'react';
import { Link } from 'react-router-dom';




class Update extends React.Component{


    render(){

        return(<div className='delete-contianer'>

                <Link to={this.props.path+"/edit"}>Modifier</Link>                
        
        </div>)
    }


}


export default Update;