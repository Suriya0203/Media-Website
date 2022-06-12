import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import ResponsiveAppBar from "./Navbar"
import {ChangePassword_action} from "../actions/auth"
const ChangePassword = ({ChangePassword_action}) => {
	const [formData, setFormData] = useState({
		CurrentPassword: "",
		NewPassword: "",
		ReEnterPassword:""
        
	});

	const { CurrentPassword, NewPassword,ReEnterPassword } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		console.log("suriya")
		e.preventDefault();
		if (NewPassword != ReEnterPassword) {
			console.log("password not match")
			alert("password doesn't match")
	}
	else{
		ChangePassword_action(formData)
	}

	}
	

	return (
		<div>
		<ResponsiveAppBar />
		<div className="login-form">
			<br />
			<h1 className="heading">ChangePassword</h1><br/>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="password"
						placeholder="Current Password"
						name="CurrentPassword"
						value={CurrentPassword}
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
						placeholder="New Password"
						name="NewPassword"
						minLength="5"
						value={NewPassword}
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
						placeholder="Re EnterPassword"
						name="ReEnterPassword"
						minLength="5"
						value={ReEnterPassword}
						onChange={(e) => onChange(e)}
						required
						style={{
							border: "0",
							borderBottom: "2px solid black",
							outline: "0"
						}}
					/>
				</div><br/>
				<input type="submit" className="bttttn" value="Submit" />
			</form>
		</div></div>
	);
};
const mapDispatchToProps=dispatch=>{
    return {
      ChangePassword_action:(formData)=>dispatch(ChangePassword_action(formData)),
    }
  }

export default connect(null,mapDispatchToProps)(ChangePassword);