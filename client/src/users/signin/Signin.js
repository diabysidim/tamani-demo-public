/** this the signin page */
import React from 'react';
import { Route , withRouter} from 'react-router-dom';
import './Signin.css';

class Signin extends React.Component{

    constructor(props){

        super(props);
        this.state = {

            username:'',
            password:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){

        e.preventDefault();

        fetch('https://nandy-tamani-demo.herokuapp.com/signin',{
        method: 'post',
        headers: {'content-type': "application/json"},
        body: JSON.stringify({
            ...this.state
        })
        }).then(Response => {
            
            console.log(Response.status)
            if(Response.status === 200){

               
               

                return Response.json()
            }

            throw new Error("wrong credentials")
        
            
        
        }).then(data=> {
            

          
            console.log(data)
         
            alert("Salut "+ data.username)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data))
            this.props.history.push('/users/'+data.id)
        })


          .catch(err => {
            console.error(err);
            alert("Il ya eu une error veuillez verifier vos informations");
          });
    }

    handleChange(e){

        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render(){

        return(<div className='signin-container'>




                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

                
                <div className='input-container'>
                        
                
                     <label htmlFor='username'>Username: </label>
                    <input type='text' name='username' value={this.state.username} placeholder='Username' onChange={this.handleChange}/>
              

               
                
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' value={this.state.password} placeholder='Password'  onChange={this.handleChange}/>
               


                </div>
                

                    <button>signin</button>

                </form>

        </div>)
    }
}

export default Signin;