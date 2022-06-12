import React,{ useState } from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { Navigate } from "react-router-dom";
import ResponsiveAppBar from "./Navbar"
import { profile } from "../actions/auth";
//import "./dashboard.css"
// import { Navigate } from "react-router-dom";
const Profile = ({profile, user }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const { name, email, phone } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		profile({ name, email, phone });
		}
	// if(isAuthenticated){
		if(!user){
			return <Navigate to="/login" />
		  }
	return (
		<div>
		<ResponsiveAppBar />
		<br/>
<div class="container">
	
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div class="user-avatar">
					<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" style={{
						position:"relative",
						right:"13%",
						width: "290px"
						
					}}/>
				</div>
				{/* <h5 class="user-name">{user && user.name}</h5>
				<h6 class="user-email">{user && user.email}</h6> */}
			</div>
			<div class="about">
				<h5>About</h5>
				<p>Full Stack Developer </p>
			</div>
		</div>
	</div>
</div>
</div>
<form className="form" onSubmit={(e) => onSubmit(e)}>
	<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
	<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mb-2 text-primary">Personal Details</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
		
				<div class="form-group" >
					<label for="fullName">Full Name</label>
					<input type="text" class="form-control" id="fullName" 
											name="name"
											value={name} 
											onChange={(e) => onChange(e)}
											placeholder="Enter full name"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group" >
					<label for="eMail">Email</label>
					<input type="email" class="form-control" id="eMail" 
											name="email"
											value={email} 
											onChange={(e) => onChange(e)}
											placeholder="Enter email ID"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="phone">Phone</label>
					<input type="text" class="form-control" id="phone" 
											name="phone"
											value={phone} 
											onChange={(e) => onChange(e)}
											placeholder="Enter phone number"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="website">Website URL</label>
					<input type="url" class="form-control" id="website" placeholder="Website url"/>
				</div>
			</div>
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mt-3 mb-2 text-primary">Address</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="Street">Street</label>
					<input type="name" class="form-control" id="Street" placeholder="Enter Street"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="ciTy">City</label>
					<input type="name" class="form-control" id="ciTy" placeholder="Enter City"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="sTate">State</label>
					<input type="text" class="form-control" id="sTate" placeholder="Enter State"/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="zIp">Zip Code</label>
					<input type="text" class="form-control" id="zIp" placeholder="Zip Code"/>
				</div>
			</div>
		</div><br/>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="text-right">
					<button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button>
					<input type="submit" className="btn btn-primary" value="submit"  
					style={{
						width:"90px",
						height:"38px"
					}}/>
				</div>
			</div>
		</div>
	</div>

	</div>
	</div>
	</form></div>
	</div></div>
	);
	// else{
	// 	return <Navigate to="/login" />;
	// }	
};
Profile.propTypes = {
	profile: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.auth.token,
});

export default connect(mapStateToProps, { profile })(Profile);