import { useParams} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { removeFriend } from '../actions/auth';
import { useDispatch } from 'react-redux';

import ResponsiveAppBar from './Navbar';
function DeleteuserById(dispatch) {
    // 👇️ get ID from url
    const params = useParams();
    dispatch=useDispatch()
    if(params.userId){
    dispatch(removeFriend(params.userId))}
    return( 
        <div>
          <ResponsiveAppBar/>
          <br/>
          <h1 style={{
            textAlign:"center"
          }}>FRIEND REMOVED SUCCESSFULLY</h1>
          <br/>
    <h2 style={{
      "text-align":"center"
    }}>userId is 👉️ {params.userId}</h2>
    
    {/* <h2>userId is 👉️ {formData}</h2> */}
    </div>
    );
  }

export default DeleteuserById