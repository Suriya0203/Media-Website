import { useParams} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { DeletePost } from '../actions/auth';
import { useDispatch } from 'react-redux';

import ResponsiveAppBar from './Navbar';
function DeletePostByid(dispatch) {
    // 👇️ get ID from url
    const params = useParams();
    dispatch=useDispatch()
    if(params.postId){
    dispatch(DeletePost(params.postId))}
    return( 
        <div>
          <ResponsiveAppBar/>
          <br/>
          <h1 style={{
            textAlign:"center"
          }}>POST DELETED SUCCESSFULLY</h1>
          <br/>
    <h2 style={{
      "text-align":"center"
    }}>userId is 👉️ {params.postId}</h2>
    
    {/* <h2>userId is 👉️ {formData}</h2> */}
    </div>
    );
  }

export default DeletePostByid