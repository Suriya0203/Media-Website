import React from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { Navigate } from "react-router-dom";
const Dashboard = ({ auth: { user,isAuthenticated } }) => {
	if(isAuthenticated){
	return (
		<div style={{ textAlign: "center" }}>
			<h1>Home page</h1>
			<h1>Welcome, {user && user.name}</h1>
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