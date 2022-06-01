import React from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom";
import ResponsiveAppBar from "./Navbar"

import {Viewpostaction} from '../actions/auth'
import { Result } from "express-validator";
const Viewpost = ({dispatch,data}) => {

    // var data=Viewpostaction()
	// console.log(data)
	// console.log(props.data)
	dispatch=useDispatch();
	const value=dispatch(Viewpostaction())
	value.then(result=>{
		console.log(JSON.stringify(result))
	})
	.catch(err=>{
		console.log(err)
	})
	
	return (
		<div>
		<ResponsiveAppBar />
		{/* <h1>{value}</h1> */}
		</div>
	);}
Viewpost.propTypes = {
	Viewpost: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	};
const mapStateToProps = state => ({
	data: state.data,
	})
	  
export default connect(mapStateToProps)(Viewpost)
