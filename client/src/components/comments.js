import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import { useParams,Navigate} from 'react-router-dom';
import {fetchcomments} from '../actions/auth'
import ResponsiveAppBar from './Navbar';
import {EditComment} from '../actions/auth'



function Comments({userData,fetchcomments,user}){
  const params = useParams();
  const id=params.id

  useEffect(()=>{
    fetchcomments(id)
},[])
if(!user){
  return <Navigate to="/login" />
}
if(userData){
  return(
  <div>
    <ResponsiveAppBar/><br/>
    <h1 style={{
      textAlign:"center"  
    }}>COMMENTS</h1>
    {(userData.map((contact, id) => (
      <div class="card">
      <div class="card-body">
                  <>
                  {/* {if({contact.commentedBy}=={user._id}){
                      <h1>suriya</h1>
                  }} */}
                  {/* <>Name : {contact.commentedByName}</><br/>
                  <>Comment: {contact.comment}</> */}
                 
                    </>

                    <div className="container">



              {(() => {

                  if (contact.commentedBy == user._id) {

                    return (

                      <div>
                      <>Name : YOU</><br/>
                    <>Comment: {contact.comment}    </><br/><br/>
                    <a href={`/deletecomment/${contact._id}`} class="btn btn-danger btn-sm" role="button" aria-pressed="true">Delete</a>
                    <a href={`/editcomment/${contact._id}`} class="btn btn-primary btn-sm" role="button" aria-pressed="true"
                    style={{
                      position:"relative",
                      left:"2%"
                    }}>Edit </a>
                        </div>
                        
                      
                    )

                  } 
                   else {

                    return (

                      <div>
                    <>Name : {contact.commentedByName}</><br/>
                  <>Comment: {contact.comment}</>
                      </div>

                    )

                  }

})()}



</div>
                   
  </div>
  </div>)))}</div>
  )
}
}
const mapStateToProps=state=>{
  return {
      userData:state.post.items.data,
      user:state.auth.token
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    fetchcomments:(id)=>dispatch(fetchcomments(id)),
    // EditComment:(id)=>dispatch(EditComment(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Comments)