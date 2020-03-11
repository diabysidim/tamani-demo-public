

import React from 'react';

class UpdateRegistrationGen extends React.Component{



    constructor(props){

        super(props);
        this.state = {
            
            email:'',
     
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(e){

        e.preventDefault();

        fetch('https://nandy-tamani-demo.herokuapp.com/users/generate_registration_link',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.token}`
            },
        body: JSON.stringify({
            ...this.state,
        })
        })
        .then( res => {
                if(res.status ===200) return res.json()
                else throw new Error()})
        
        .then(data => {



                this.props.history.push('/users/'+this.props.user.id)

        }).catch(  err =>{

            alert("cet email n'est pas enregistre sur tamani")
            this.setState({
                email : ""
            })

        }   
                
             )
    }

    handleChange(e){

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){

       return <div className='signin-container'>


        <form onSubmit={this.handleSubmit} >


        
        <div>
      
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' value={this.state.email} placeholder='votre email enregistre sur tamani' onChange={this.handleChange} required/>

        </div>


            <button>Envoyer</button>

        </form>

</div>    

    }

}

export default UpdateRegistrationGen;