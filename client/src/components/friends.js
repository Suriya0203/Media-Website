import React from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { Navigate } from "react-router-dom";
import ResponsiveAppBar from "./Navbar"
import "./dashboard.css"
const Friends = ({ auth: { user,isAuthenticated } }) => {
	if(isAuthenticated){
	return (
		<div class="name">
		<ResponsiveAppBar />
		<div style={{ textAlign: "center" }}>
			<h1>Welcome, {user && user.name}</h1>
		</div>
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