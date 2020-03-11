

import React from 'react';

class UpdatePassword extends React.Component{



    constructor(props){

        super(props);
        this.state = {
            
            oldPassword:'',
            newPassword:'', 
            passwordConfirmation:''       
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(e){

        e.preventDefault();
        if(this.state.password!= this.state.confitmationPassword) return alert("les mots de passes sont differents")
        fetch('https://nandy-tamani-demo.herokuapp.com/users/'+this.props.user.id+'/change_password',{
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
        .then( res => {
                if(res.status ===200) return res.json()
                else throw new Error()})
        
        .then(data => {


                alert("votre mot de pass a ete modifie")

                this.props.history.push('/users/'+this.props.user.id)

        }).catch(  err =>{

            alert("il ya eu un problem! veuillez verifier si toutes les information sont correct")
            this.setState({
                oldPassword:'',
                newPassword:'', 
                passwordConfirmation:''
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


        <div className='input-container'>
        <label htmlFor='oldPassword'>{`Ancien mot de pass`}: </label>
        <input type='password' name='oldPassword' value={this.state.oldPassword} placeholder='Ancien mot de pass' onChange={this.handleChange} required/>
       
        
        
        <label htmlFor='newPassword'>Nouveau mot de pass</label>
        <input type='password' name='newPassword' value={this.state.newPassword} placeholder='Nouveau mot de pass' onChange={this.handleChange} required />

        
        <label htmlFor='passwordConfirmation'>Confirmer le mot de pass</label>
        <input type='password' name='passwordConfirmation' value={this.state.passwordConfirmation} placeholder='confirmer le mot de pass' onChange={this.handleChange} required/>
    
        
    
        </div>


            <button>Modifier</button>

        </form>

</div>    

    }

}

export default UpdatePassword;