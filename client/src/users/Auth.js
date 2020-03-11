import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function Auth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        user:{}
      };
    }

    componentDidMount() {
      fetch('https://nandy-tamani-demo.herokuapp.com/checkToken',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        }})
        .then(async res => {
         
          if (res.status === 200) {

            const user = await res.json();
            
            console.log(res.status)
            this.setState({ loading: false, 
                user: user
             });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }


    render() {
      const { loading, redirect } = this.state;
      
      if (loading) {
        return <div> loading ...</div>;
      }
      if (redirect) {
        return <Redirect to="/signin" />;
      }

      return <ComponentToProtect {...this.props} user={this.state.user} />;
    }
  }
}