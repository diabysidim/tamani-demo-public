

import React from 'react';
import Loading from '../../utilities/loading/Loading';
import { Link } from 'react-router-dom';

class User extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            user:{}, 
            loading:true,
            error: false,
        }
    }
    async componentDidMount(){

        try{
            const response = await fetch('https://nandy-tamani-demo.herokuapp.com/users/'+this.props.match.params.id,{
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${localStorage.token}`
                }});
            const data = await response.json();
            this.setState({

                user: data,
                loading: false, 
                error:false

            })

        }
        catch(e){

            this.setState({
                error:true,
                loading:false
            })

        }
       

    }

    render(){


        return this.state.loading? <div> <Loading/> </div>:
        
            
            this.state.error?<div> 404 this page does not exist </div>:
            
            <div className="user-component">

                <h3>{this.state.user.name}</h3>

                    <table>
                         <tr>    
                            <td>
                            Username
                            </td>
                            <td>
                            {this.state.user.username}
                            </td>
                        
                        </tr>
                        <tr>    
                            <td>
                            Email:
                            </td>
                            <td>
                            {this.state.user.email}
                            </td>
                        
                        </tr>

                        <tr>    
                            <td>
                            Jour the creation:
                            </td>
                            <td>
                            {this.state.user.creation_date}
                            </td>
                        
                        </tr>

                        <tr>    
                            <td>
                            entries:
                            </td>
                            <td>
                            {/*this.state.user.email*/ 4}
                            </td>
                        
                        </tr>

                        <Link to={'/users/'+this.state.user.id+'/edit'}>Modifier</Link>

                        <Link to={'/users/'+this.state.user.id+'/change_password'}>Changer votre mot de pass</Link>




                    </table>

                
            </div>
    }


}

export default User;