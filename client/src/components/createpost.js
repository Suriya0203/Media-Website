
import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import {Imageupload} from '../actions/auth'
import ResponsiveAppBar from "./Navbar"
const Createpost = () => {

    const [post, setPost] = useState()
    const [caption, setCaption] = useState("")


    const dispatch = useDispatch();


    const myHandler = (events) => {
        if(events.target.files && events.target.files.length > 0) {
            setPost(events.target.files[0])
        }
    }

    const removeSelectedImage = () => {
        setPost();
    }
    const submitHandler = async (event) => {
        event.preventDefault();

var url = 'http://localhost:2000/createpost';
        const formdata = new FormData();
        formdata.append('image', post, post.name);
        formdata.append('name', caption)
        dispatch(Imageupload(formdata))

    }
  return (
    <div>
        <ResponsiveAppBar />
        <div id = "imagecontainer"> 
            <div className='col1'>
                
                <form onSubmit={submitHandler}>
                    <br/>
                    <span style={{color : 'green', fontSize:'12px', fontFamily:'cursive', textAlign:'center', paddingLeft:'20px'}} id="postSuccess"></span>
                    {post && (
                        <div>
                            <img 
                                src={URL.createObjectURL(post)} style={{width:"30%"}}
                            />
                            <TextField type="text" 
                                label='Add caption'
                                id='addCaption'
                                autoComplete='off'
                                style={{width:'340px', margin:'10px'} }
                                onChange={(e)=>setCaption(e.target.value)}
                            /><br />
                            <button type="submit" style={{}}>Upload</button>
                            <button onClick={removeSelectedImage} >Remove</button>
                        </div>  
                    )} 
                    {!post && (
                        <div className='imgButton'>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQohH8t-0vC69qazVPNsN9Ew-CVJnw5h7NqDRBCe5lf&s" 
                            style={{
                                width:"30%",
                                position:"relative",
                                
                            }}
                            />
                            <input type="file" id='file' name="testImage" onChange={myHandler} />
                        </div>
                    )}
                </form>
            </div>
        </div>
    </div>
  )
}
export default Createpost
