
/**  Page navigation bar
 * takes a path and a number page to create a navbar
 */
import React from 'react';
import {NavLink} from 'react-router-dom';
import './PageNav.css';


class  PageNav extends React.Component{
      
        

        

        render(){

            return( 
                <div className='page-nav--container'>

                    {this.props.pageNums && this.props.pageNums.map( pageNum =>(
                        <NavLink key={this.props.pageNums.indexOf(pageNum)} to={pageNum} activeClassName="clicked">{this.props.pageNums.indexOf(pageNum)+1}</NavLink>

                    ))}
                
                </div>)

        }


}

export default PageNav;