
import React from 'react';
import { Redirect } from 'react-router-dom';

class Signout extends React.Component{

        constructor(props){

            super(props);
            
               
                this.handleLogout = this.handleLogout.bind(this);
            
        }


        handleLogout(){

                fetch('https://nandy-tamani-demo.herokuapp.com/logout',
                {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                      Authorization: `Bearer ${localStorage.token}`
                    }})
                .then( Response =>{

                    if(Response.status===200){  

                        

                        
                        
                        localStorage.clear()
                        this.props.history.push('/')
                        alert("Vous avez etez deconnectes");

                    }
                    else{

                       this.props.history.goBack();
                        alert("There was a problem disconnecting you");
                    }
                })
        }

        render(){

            return <div>

                        {this.handleLogout()}
                       
            
                    </div>
        }

}

export default Signout;