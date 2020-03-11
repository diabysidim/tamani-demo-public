

  /* this component allows the creation of a new deal
    @props a list of categories 
    it posts the deals to the server via fetch 
    it also send an image    
  */

import React from 'react';
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';
import './CreateDeal.css';
import {Redirect} from 'react-router-dom';

 
const Font = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link'],
    ['clean']
  ],
  clipboard: {
    
    matchVisual: false,
  }
}

const Option = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]




class CreateDeal extends React.Component{

    	/* state.text is text in the deal */
    constructor(props) {
        super(props);
         this.state = { text:'', title:'', category:this.props.categories[0], img:null,  imgPath:''};
         this.handleChange = this.handleChange.bind(this);
         this.handleQuillChange = this.handleQuillChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleImage = this.handleImage.bind(this);
    }


    

    	/* hadle the change in the input */
     handleChange(e) {
        
        this.setState({
            [e.target.name]: e.target.value
        });
      };

        /* handle changes for the quill editor*/
        
      handleQuillChange (html, delta,source, editor){
           this.setState({text: editor.getHTML()});
       }

       handleImage = (e)  =>{

            
            e.preventDefault();
            let image = e.target.files[0]
            
            if(image instanceof File && image.type==='image/jpeg' || image.type==='image/png'){

              

            const promise = new Promise((resolve) => {
                let fr = new FileReader()
                fr.onload = x=> resolve(fr.result);
                fr.readAsDataURL(image)}).then( data => {
                this.setState({img: image, imgPath: data})}).catch(console.log("threwas an error"))
                
            }
       }
       

       /* handles the submission of the form*/
      async handleSubmit(e){

        e.preventDefault();
        const formData = new FormData();
        formData.append('description',this.state.text)
        formData.append('title',this.state.title)
        formData.append('category',this.state.category)
        formData.append('dealImage',this.state.img) 

        try{

          const Response =  await fetch('https://nandy-tamani-demo.herokuapp.com/deals/new',{
            method: "POST",
            headers: {
             
              Authorization: `Bearer ${localStorage.token}`
            },
            body: formData        
          })

          if(Response.status === 200){

            const data = await Response.json();

            alert("the deal was created !!")

            this.props.history.push('/deals/'+data.id);

            

           

          }
          else{

            throw new Error()
          }
         

         

        }
     
    
      catch{
        
        alert("there was an error creating this deal")

      }
    
    }

        render(){

                 return(<div className='create-deal-container'>

                <h2> Create a new deal</h2>




                <form  onSubmit={this.handleSubmit}>

                

                <div> 

                <div className='edit-image' style={{backgroundImage: `url(${this.state.imgPath})`,
                width:'300px', height:'200px', backgroundPosition:'center', backgroundSize:'cover',margin:'auto' }}> </div>

                    <label htmlFor='title' >Title: </label>
                    <input type='text' name='title' value={this.state.title} onChange={this.handleChange} required/>


                    <label htmlFor='category' >Category: </label>
                    <select name='category' value={this.state.category} onChange={this.handleChange} required>
                        {this.props.categories.map(category =>(<option>{category}</option>))}
                    </select>

                    <label htmlFor='img' >image: </label>
                    <input type='file' name='dealImg' accept='image/jpeg, image/png' onChange={this.handleImage} required/>

                </div>

                <ReactQuill className='react-quill'
                        ref={(el) => { this.reactQuillRef = el }}
                        theme={'snow'}
                        onChange={this.handleQuillChange}
                        modules={Font}
                        formats={Option}
                        defaultValue={this.state.editorHtml}
                        placeholder={this.props.placeholder} /> 
                    <button>Create a deal</button>

                
                    
             </form >
                


            </div>)
            
        }



}




export default CreateDeal;