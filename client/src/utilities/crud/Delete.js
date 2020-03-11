
import React from 'react';
import {Redirect} from 'react-router-dom';




class Delete extends React.Component{

    constructor(props){

        super(props);
        this.state = {

            redirect : false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(){
        try{

            const response= await fetch('https://nandy-tamani-demo.herokuapp.com/deals/'+ this.props.id,
            {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${localStorage.token}`
                }});
            const data =  await response.json();
            if(data){alert(data.msg)
                      
                      this.setState({ 
      
                              redirect : true,
                      })}

        }
    
      catch(e){

            alert("il ya eu un problem! reessayer!")
      }

    }


    render(){

        return(
                this.state.redirect?
                
                
                <div>
                    {this.props.goback()}
                </div>:

                <div className='delete-contianer'>
                        
                <form onSubmit={this.handleSubmit}>
                    <button>Delete</button>

                </form>
        
                </div>
                
                
            )
    }


}


export default Delete;