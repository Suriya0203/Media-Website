import { useParams} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { DeleteComment } from '../actions/auth';
import { useDispatch } from 'react-redux';

import ResponsiveAppBar from './Navbar';
function DeleteCommentById(dispatch) {
    // 👇️ get ID from url
    const params = useParams();
    dispatch=useDispatch()
    if(params.userId){
    dispatch(DeleteComment(params.userId))}
    return( 
        <div>
          <ResponsiveAppBar/>
          <br/>
          <h1 style={{
            textAlign:"center"
          }}>COMMENT DELETED SUCCESSFULLY</h1>
          <br/>
    <h2 style={{
      "text-align":"center"
    }}>userId is 👉️ {params.userId}</h2>
    
    {/* <h2>userId is 👉️ {formData}</h2> */}
    </div>
    );
  }

export default DeleteCommentById