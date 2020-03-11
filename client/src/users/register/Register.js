
/* this component help add a new user to the db
*/
import React from 'react';

import '../signin/Signin.css';

class Register extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            
            name:'',
            email:'',
            username:'',           
            password:'',
            confitmationPassword:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){

        e.preventDefault();

        if(this.state.password!= this.state.confitmationPassword) return alert("les mots de passes sont differents")

        fetch('https://nandy-tamani-demo.herokuapp.com/register',{
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.token}`
            },
        body: JSON.stringify({
            ...this.state
        })
        })
        .then( 
            
            res => {

                if(res.status !== 200) throw new Error("ce nom d'utilasateur ou email est deja utilise")
               return res.json()
                
                
            })
        
        .then(data => {

                alert(data.msg)
                this.props.history.push('/users/'+ this.props.match.params.id)

        }).catch( err => alert(err))
    }

    handleChange(e){

        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render(){

        return(<div className='signin-container'>


                <form onSubmit={this.handleSubmit} >


                <div className='input-container'>
                <label htmlFor='name'>{`Name and Lastname`}: </label>
                <input type='text' name='name' value={this.state.name} placeholder='Name' onChange={this.handleChange} required/>
               
                
                
                <label htmlFor='email'>Email </label>
                <input type='text' name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} required/>
                
                    
              
                     <label htmlFor='username'>Username: </label>
                    <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleChange}required/>
                

               
             
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} required/>
                
                <label htmlFor='confitmationPassword'>Password confirmation: </label>
                <input type='password' name='confitmationPassword' value={this.state.confitmationPassword} placeholder='Password' onChange={this.handleChange} required/>
                </div>


                    <button>signin</button>

                </form>

        </div>)
    }
}

export default Register;