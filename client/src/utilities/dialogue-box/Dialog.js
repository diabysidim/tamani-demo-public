

import React from 'react';
import{Link} from 'react-router-dom'


class Dialog extends React.Component{



    render(){


        return <div className="dialog-container">

                <p>{this.props.message}</p>
                
                {this.props.links.map( link => <Link to={link.path}>link.name</Link>)}
            </div>
    }


}


export default Dialog;