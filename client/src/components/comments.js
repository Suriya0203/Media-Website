import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import { useParams,Navigate} from 'react-router-dom';
import {fetchcomments} from '../actions/auth'
import ResponsiveAppBar from './Navbar';
import {EditComment} from '../actions/auth'
// import ResponsiveAppBar from './Navbar';
import { GetPost } from '../actions/auth';
import { fetchimages}  from "../actions/auth"
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

function Comments({userData,fetchcomments,user,token,GetPost,post}){
  const params = useParams();
  const id=params.id

  useEffect(()=>{
    fetchcomments(id)
},[])
if(userData && userData!=null){
console.log(userData[0]['postId'])

  GetPost(userData[0]['postId'])

console.log(post,12345)}
// if(userData[0]['postId']){
// console.log(userData[0]['postId'])
// }

if(!token){
  return <Navigate to="/login" />
}
if(userData &&post){
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(post.image.data.data))
  );
  return(
  <div>
    <ResponsiveAppBar/><br/>
    <div className="App">
      
      {/* {(() => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(post.image.data.data))
        );
        return ( */}
            <div>
              {/* <h1>suriya</h1> */}
        {/* <img src={`data:image/png;base64,${base64String}`} width="300"/> */}
        <Card sx={{ width:"95%",position:"relative",left:"2.5%",top:"10px"}}>
<CardHeader
avatar={
<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
  S
</Avatar>
}
action={
<IconButton aria-label="settings">
  <MoreVertIcon />
</IconButton>
}
title={post.createdByName}
/>
<CardMedia
component="img"
width= "200px"
height= "200px"
object-fit= "cover"
image={`data:image/png;base64,${base64String}`}

/>
<CardContent>
<Typography variant="body2" color="text.secondary">
{post.name}
</Typography>
</CardContent>
<>
</>
<CardActions disableSpacing>





</CardActions>
</Card>

           <br/>
            </div>
      {/* )})} */}
    </div>
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
      token:state.auth.token,
      user:state.auth.user,
      post:state.search.user.data
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    fetchcomments:(id)=>dispatch(fetchcomments(id)),
    GetPost:(id)=>dispatch(GetPost(id)),
    // EditComment:(id)=>dispatch(EditComment(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Comments)