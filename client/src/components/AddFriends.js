import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import {fetchProducts} from '../actions/auth'
import cx from 'clsx';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import ResponsiveAppBar from "./Navbar"
import { Navigate } from "react-router-dom";

////
const usePersonStyles = makeStyles(() => ({
  text: {
    fontFamily: 'Barlow, san-serif',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  name: {
    fontWeight: 600,
    fontSize: '1rem',
    color: '#122740',
  },
  caption: {
    fontSize: '0.875rem',
    color: '#758392',
    marginTop: -4,
  },
  btn: {
    borderRadius: 20,
    padding: '0.125rem 0.75rem',
    borderColor: '#becddc',
    fontSize: '0.75rem',
  },
}));

function redirect(){
  return <Navigate to="/adduser" />;
}


const PersonItem = ({ src, name, friendCount,id }) => {
  const avatarStyles = useDynamicAvatarStyles({ size: 56 });
  const styles = usePersonStyles();
  console.log(id  )

  return (
    <Row gap={2} p={2.5}>
      <Item>
        <Avatar classes={avatarStyles} src={src} />
      </Item>
      <Row wrap grow gap={0.5} minWidth={0}>
        <Item grow minWidth={0}>
          <div className={cx(styles.name, styles.text)}>{name}</div>
          <div className={cx(styles.caption, styles.text)}>
            {friendCount} mutual friends
          </div>
        </Item>
        <Item position={'middle'}>
        <Button className={styles.btn} style={{
          position:"relative",
          right:"4%"
        }} variant={'outlined'}  href={`/addfriendbyid/${id}`} >
             View
           </Button>
        <Button className={styles.btn} variant={'outlined'}  href={`/addfriendbyid/${id}/${name}`} >
             Follow
           </Button>
           
        </Item>
      </Row>
    </Row>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
    borderRadius: 16,
    boxShadow: '0 8px 16px 0 #BDC9D7',
    overflow: 'hidden',
  },
  header: {
    fontFamily: 'Barlow, san-serif',
    backgroundColor: '#fff',
  },
  headline: {
    color: '#122740',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  link: {
    color: '#2281bb',
    padding: '0 0.25rem',
    fontSize: '0.875rem',
  },
  actions: {
    color: '#BDC9D7'
  },
  divider: {
    backgroundColor: '#d9e2ee',
    margin: '0 20px',
  }
}));


/////
function UserContainer({userData,fetchProducts}){
    
    useEffect(()=>{
        fetchProducts()
    },[])
    console.log(userData)
    // React.memo(function SocialCard() {
          const styles = useStyles();
           
            if (userData){
          
            //   console.log(post.data,12345)
          return (
            <><ResponsiveAppBar />
          {/* <h1>{contacts&&contacts.name}/</h1> */}
              <NoSsr>
                <GoogleFontLoader fonts={[{ font: 'Barlow', weights: [400, 600] }]} />
              </NoSsr>
              <Column p={0} gap={0} className={styles.card}>
                <Row wrap p={2} alignItems={'baseline'} className={styles.header}>
                  <Item stretched className={styles.headline}>Who to follow</Item>
                  <Item className={styles.actions}>
                    <Link className={styles.link}>Refresh</Link> •{' '}
                    <Link className={styles.link}>See all</Link>
                  </Item>
                </Row>
                
                <Divider variant={'middle'} className={styles.divider} />
                <PersonItem name={'Kavin'} friendCount={2} src={'https://i.pravatar.cc/300?img=20'} />
                <Divider variant={'middle'} className={styles.divider} />
                <PersonItem name={'Gokul'} friendCount={2} src={'https://i.pravatar.cc/300?img=30'} />
                <Divider variant={'middle'} className={styles.divider} />
                {(userData.map((contact, id) => (
                  <>
                    <PersonItem name={contact.name} id={contact._id}friendCount={6} src={'https://i.pravatar.cc/300?img=10'} />
                    <Divider variant={'middle'} className={styles.divider} />
                    </>
                   )))}
               
        
              </Column>
            </>
          );
        };
}

const mapStateToProps=state=>{
    return {
        userData:state.post.items.data,
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        fetchProducts:()=>dispatch(fetchProducts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserContainer)