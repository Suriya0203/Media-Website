import { useParams} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { EditComments } from '../actions/auth';
import { useDispatch } from 'react-redux';
import {connect} from 'react-redux'
import ResponsiveAppBar from './Navbar';
function EditComment({EditComments}) {
    // 👇️ get ID from url
    const params = useParams();
    console.log("suriay")
    const [formData, setFormData] = useState({
		comment: "",
        id:""
	
	});

	const { comment,id } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value ,["id"]: params.userId.toString()});

	const onSubmit = async (e) => {
		e.preventDefault();

		EditComments(formData);
	};
 
    // dispatch=useDispatch()
    // if(params.userId){
    // dispatch(A(params.userId,params.name))}
    return( 
        <div>
          <ResponsiveAppBar/>
          <br/>
         <h1 style={
          { textAlign:"center",
        position:"relative",
        right:"4%"}
         }> EDIT COMMENT</h1>
        
			<form className="form" onSubmit={(e) => onSubmit(e)} style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
            }} >
				<div className="form-group">
					<input
						type="text"
						placeholder="Add Comment"
						name="comment"
                        value={comment}
						onChange={(e) => onChange(e)}
						style={{
							border: "0",
							borderBottom: "2px solid black",
							outline: "0"
						}}
					/>
				</div>
				<input type="submit" className="bttttn" value="Submit" />
			</form>
    {/* <h2>userId is 👉️ {formData}</h2> */}
    </div>
    );
  }

const mapStateToProps=state=>{
    return {
      products: state.image.items.data,
      loading: state.image.loading,
      error: state.image.error
    }
  }
const mapDispatchToProps=dispatch=>{
    return {
      EditComments:(formData)=>dispatch(EditComments(formData)),
    }
  }
  


  export default connect(mapStateToProps,mapDispatchToProps)(EditComment)