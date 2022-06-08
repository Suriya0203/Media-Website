import React,{useEffect,useState} from 'react';
import { logout } from "../actions/auth"
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom';
function Logout_auth({logout}){

        logout()
    
    return (
         <Navigate to="/login" />    )
}

const mapDispatchToProps=dispatch=>{
    return {
      logout:()=>dispatch(logout()),
  
    }
  }


export default connect(null,mapDispatchToProps)(Logout_auth)