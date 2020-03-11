
/* this component renders the admin page
@props = user
        user can register, create a deal, see stats and so on
*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Admin.css';

class Admin extends Component{

        constructor(props){

                super(props);

                this.displayContent = this.displayContent.bind(this)
        }

        displayContent(){

                if(this.props.user.admin){


        return  [<Link to='/users/generate_registration_link'>Envoyer un email de registration</Link>,
                        <Link to={`/users/${this.props.user.id}/register`}> Ajouter un utilisateur manuellement</Link>, 
                        <Link to='/users'> Gerer les utilisateurs</Link>, <Link to='/stats'>Voir les stats</Link>]
                      
                }

        }

        render(){


            return (<div className='Admin-container'>

            <h1> Administration </h1> 
             <h3> Salut! {this.props.user.name}</h3>
             
                <div className='option-container'>

                 <Link to={`/users/${this.props.user.id}/deals/new`}> Ajouter un Plan</Link>
                 <Link to={'/users/'+this.props.user.id+'/profil'}>Voir votre Profil</Link>
                 <Link to={`/users/${this.props.user.id}/deals`}>Voir vos plans</Link>                            
                                                                                                 
                                        
                
                {this.displayContent() && this.displayContent().map(content =>content)}
             </div>

         </div>)
        }

}

export default Admin;
