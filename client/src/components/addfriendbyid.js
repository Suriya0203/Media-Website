import { useParams} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { AddfriendByid } from '../actions/auth';
import { useDispatch } from 'react-redux';

import ResponsiveAppBar from './Navbar';
function AdduserById(dispatch) {
    // 👇️ get ID from url
    const params = useParams();
  
    //  console.log(params); // 👉️ {userId: '4200'}
  
  //   const [formData, setFormData] = useState({
	// 	id: "",

	// },[]);
  // useEffect(()=>{
  //   setFormData(params.userId);
  // },[])

  //   console.log(formData)
  //   if(formData){
  //     AddfriendByid(formData)
  //   }
    //cnsole.log()
    dispatch=useDispatch()
    useEffect(()=>{
      dispatch(AddfriendByid(params.userId,params.name))
  },[])
   
    if(params.userId){
    }
    return( 
        <div>
          <ResponsiveAppBar/>
          <br/>
          <h1 style={{
            "text-align":"center"
          }}>FRIEND ADDED SUCCESSFULLY</h1>
          <br/>
    <h2 style={{
      "text-align":"center"
    }}>userId is 👉️ {params.userId}</h2>
    
    {/* <h2>userId is 👉️ {formData}</h2> */}
    </div>
    );
  }

export default AdduserById