import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import { ViewUserprofile } from '../actions/auth';
import { useParams } from 'react-router-dom';
import ResponsiveAppBar from "./Navbar"
import { Navigate } from "react-router-dom";
const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

function ViewUser({ViewUserprofile,userData,user}){
  const styles = useStyles();
  const params=useParams()
  const shadowStyles = useFadedShadowStyles();
console.log(params.id)
useEffect(()=>{
  ViewUserprofile(params.id)
},[])



  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });
  console.log(userData)
  if(!user){
    return <Navigate to="/login" />
  }
  if(userData){
  return (
    // <div> //  {(userData.map((contact, id) => ( 
      
      
      <><ResponsiveAppBar /><br/>
    <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
        <Avatar className={styles.avatar} src={'https://i.pravatar.cc/300'} />
        <h3 className={styles.heading}>{userData.name}</h3>
        <span className={styles.subheader}>India</span>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Followers</p>
          <p className={styles.statValue}>5</p>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Following</p>
          <p className={styles.statValue}>5</p>
        </Box>
      </Box>
    </Card>
</>
  )}
}

const mapStateToProps=state=>{
  return {
      userData:state.post.items,
      user:state.auth.token
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    ViewUserprofile:(id)=>dispatch(ViewUserprofile(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewUser)
// export default ViewUser