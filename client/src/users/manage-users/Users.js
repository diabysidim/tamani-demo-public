


import React from 'react';
import Loading from '../../utilities/loading/Loading';
import {Link} from 'react-router-dom';

class Users  extends React.Component{

    constructor(props){

        super(props);
        this.state ={

            users: [],
        }
        this.deleteUser = this.deleteUser.bind(this)
    }



    deleteUser(){

        
    }


     componentDidMount(){
        
        try{
         fetch('https://nandy-tamani-demo.herokuapp.com/users',{
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.token}`
            }})
         .then(response => response.json())
         .then(users =>{

                    this.setState({

                        users:users.users,
                     })
                })

     
       
        }
       catch(e) {

            alert(e);
        }   
       


    }

    render(){
                let users = this.state.users;
        return( users?   <div>
                                <table> 
                                <tr>
                                        <td>Username</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Date de creation</td>
                                        {/*<td>{user.admin}</td>*/}
                                        <td></td>
                                        <td></td>
                                </tr>
                                

                                 { users.map(user =><tr>
                                        <td>{user.username}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.creation_date}</td>
                                        {/*<td>{user.admin}</td>*/}
                                        <td><Link to={'/users/'+ users.id+'/edit'}>Modifier</Link></td>
                                        <td> <button onClick={this.deleteUser}>supprimer</button></td>
                                    </tr>) }
                                </table>

                        </div>:
                        <div>
                            <Loading />
                        </div>)
    }
}

export default Users;