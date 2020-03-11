
import React, {Component} from 'react';


function RenderHTML (props) {


    return (<p>
                {props.description.replace(/<[^>]*>/g,'').split('&nbsp;').join(' ') }
            </p>)



}



export default RenderHTML;