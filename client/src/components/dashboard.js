import React from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { Navigate } from "react-router-dom";
import ResponsiveAppBar from "./Navbar"
import Fetchimages from '../components/fetchimage';
import Images from '../components/image'
import "./dashboard.css"
const Dashboard = ({ auth: { user,isAuthenticated } }) => {
	if(isAuthenticated){
	return (
		<div class="name">
		<ResponsiveAppBar />
		<div style={{ textAlign: "center" }}>
			<br/>
			<h1>Welcome, {user && user.name}</h1>
		</div>
		<Images/>
		</div>

	);}
	else{
		return <Navigate to="/login" />;
	}	
};
Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);