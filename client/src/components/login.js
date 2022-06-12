import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";
import ResponsiveAppBar from "./Navbar"

const Login = ({ login, user }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		login(email, password);
	};

	// Redirect if logged in
	if (user===null) {
		
	

	return (
		<div>
		<ResponsiveAppBar />
		<div className="login-form">
			<br />
			<h1 className="heading">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign Into Your Account
			</p>
			
			
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
						required
						style={{
							border: "0",
							borderBottom: "2px solid black",
							outline: "0"
						}}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="5"
						value={password}
						onChange={(e) => onChange(e)}
						required
						style={{
							border: "0",
							borderBottom: "2px solid black",
							outline: "0"
						}}
					/>
				</div>
				<input type="submit" className="bttttn" value="Login" />
			</form>
			<p className="link">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</div></div>
	);}
	else{
		return <Navigate to="/dashboard" />;
	}
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Login);