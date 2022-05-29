import React from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { Navigate } from "react-router-dom";
import ResponsiveAppBar from "./Navbar"
//import "./dashboard.css"
const Profile = ({ auth: { user,isAuthenticated } }) => {
	// if(isAuthenticated){
	return (
		<div class="name">
		<ResponsiveAppBar />
		<div style={{ textAlign: "center" }}>
			{/* <h1>Home page</h1> */}
			<h1> {user && user.name}</h1>
            <h2> {user && user.email}</h2>
			<h2> {user && user.friends}</h2>
            {/* <h3> {user && user.name}</h3> */}
		</div>
		</div>
	);
	// else{
	// 	return <Navigate to="/login" />;
	// }	
};
Profile.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Profile);