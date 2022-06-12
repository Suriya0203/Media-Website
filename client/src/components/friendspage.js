import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './Navbar'
import {connect} from 'react-redux'
import { Navigate } from "react-router-dom";
function FriendsPage({user}) {
  if(!user){
    return <Navigate to="/login" />
  }
  return (
	<div>  
	<ResponsiveAppBar />

	{/* ,position:'relative',left:'35%' */}
    <Card sx={{ width:"95%",position:"relative",left:"2.5%",top:"10px"}}>
      <CardMedia
        component="img"
        height='400px'
        image="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          FRIENDS
        </Typography>
        <Typography variant="body2" color="text.secondary">
		View your FRIENDS or add your own FRIENDS
        </Typography>
      </CardContent>
      <CardActions>
        <Button  size="large" variant="contained" href='/add_friends' style={{
      position:"relative",
      left:".5%"
    }}>ADD FRIENDS</Button>
		<Button  size="large" variant="contained" href='/view_friends' style={{
      position:"relative",
      left:"4%"
    }}>VIEW FRIEND</Button>
      </CardActions>
    </Card>
	</div>
  );
}
const mapStateToProps=state=>{
  return {

      user:state.auth.token
    }
}
export default connect(mapStateToProps)(FriendsPage)