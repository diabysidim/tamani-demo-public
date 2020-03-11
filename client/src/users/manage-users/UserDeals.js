


import React from 'react';
import Loading from '../../utilities/loading/Loading';
import {Link} from 'react-router-dom';

class UserDeals  extends React.Component{

    constructor(props){

        super(props);
        this.state ={

            deals: [],
        }
        this.deleteUser = this.deleteUser.bind(this)
    }



    deleteUser(){

        
    }


     componentDidMount(){
        
        try{
         fetch('https://nandy-tamani-demo.herokuapp.com/users/:id/deals', {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.token}`
            }})
         .then(response => response.json())
         .then(deals =>{
                    
                    console.log(deals)
                    this.setState({

                       deals: deals,
                     })
                })

     
       
        }
       catch(e) {

            alert(e);
        }   
       


    }

    render(){
                let deals = this.state.deals;
        return( deals?   <div>
                                <table> 
                                <tr>
                                        <td>Title</td>
                                        <td>description</td>
                                        <td>creted by </td>
                                        <td>Date de creation</td>
                                       
                                </tr>
                                

                                 { deals.map(deal =><tr>
                                        <td>{deal.title.slice(0,40)}</td>
                                        <td>{deal.description.slice(0, 50)}</td>
                                        <td>{deal.created_by}</td>
                                        <td>{deal.creation_date}</td>
                                        <td><Link to={'/deals/'+ deal.id}> Voir deal </Link></td>

                                    </tr>) }
                                </table>

                        </div>:
                        <div>
                            <Loading />
                        </div>)
    }
}

export default UserDeals;