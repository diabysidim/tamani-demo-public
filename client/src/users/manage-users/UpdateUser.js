

import React from 'react';

class UpdateUser extends React.Component{



    constructor(props){

        super(props);
        this.state = {
            
            name:'',
            email:'', 
            username:''       
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount(){

        try {
            
            const response  = await fetch('https://nandy-tamani-demo.herokuapp.com/users/'+this.props.user.id, {
                method: 'post',
                headers: {'content-type': "application/json"},
                body: JSON.stringify({
                    ...this.state,
                    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IlNpZGkgRGlhYnkiLCJ1c2VybmFtZSI6InBvdGF0bzciLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgzNTk5MDI1LCJleHAiOjE1ODM2ODU0MjV9.2EosrqA7pPEpd0wcMQqDnH3R-J7W8AaBNdBuWnCbLlc"
                })})

                const data = await response.json();

                this.setState({

                    name: data.name,
                    email: data.email,
                    username: data.username
                })


        } 
        
        catch (error) {

            alert("there is a issue")
            
        }


    }

    handleSubmit(e){

        e.preventDefault();

        fetch('https://nandy-tamani-demo.herokuapp.com/users/'+this.props.user.id,{
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.token}`
            },
        body: JSON.stringify({
            ...this.state,
        })
        })
        .then( res => res.json())
        
        .then(data => {

            console.log(data.newUser)
                alert("votre profil a ete modifie")

                this.props.history.push('/users/'+this.props.user.id)

        }).catch( err => alert(err.msg))
    }

    handleChange(e){

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){

       return <div className='signin-container'>


        <form onSubmit={this.handleSubmit} >


        <div className='input-container'>
        <label htmlFor='name'>{`Name and Lastname`}: </label>
        <input type='text' name='name' value={this.state.name} placeholder='Name' onChange={this.handleChange} />
       
        
        
        <label htmlFor='email'>Email </label>
        <input type='text' name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} />

        
        
    
        
    
        </div>


            <button>Edit</button>

        </form>

</div>    

    }

}

export default UpdateUser;