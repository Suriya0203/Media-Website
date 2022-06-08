import { render } from "ejs";

function name(){
    return (
        <div className="App">
          <h1>Image uploading react</h1>
          {products.map((singleData) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(singleData.image.data.data))
            );
            return (
                <div>
            <img src={`data:image/png;base64,${base64String}`} width="300"/>
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
  title={contact.name}
/>
<CardMedia
  component="img"
  height="194"
  image={`data:image/png;base64,${base64String}`}

/>
<CardContent>
  <Typography variant="body2" color="text.secondary">
    This impressive paella is a perfect party dish and a fun meal to cook
    together with your guests. Add 1 cup of frozen peas along with the mussels,
    if you like.
  </Typography>
</CardContent>
  <>
</>
<CardActions disableSpacing>
  <IconButton aria-label="add to favorites" onClick={()=>Addlike(contact._id)}>
    <FavoriteIcon />      
  </IconButton>
  <IconButton aria-label="broke" onClick={()=>RemoveLike(contact._id)}>
    <HeartBrokenIcon />
  </IconButton>
  <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>

  <Link    
to={`/comments/${contact._id}`}
                        //  onClick={() => this.props.dispatch(AddfriendByid(contact._id))}
>
     <IconButton aria-label="comments">
    <InsertCommentIcon />
  </IconButton>
</Link>
<TextField   id="outlined-basic" label="Add Comment" size="small" 
value={comment}
name="comment"
onChange={(e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value,["postId"]: contact._id  });
          }}

style={{
height:"-2px",
position:"relative",
top:"-4px",
borderBottom: "none"
}} variant="outlined" />
    <IconButton aria-label="send" onClick={Passvalue}>
    <SendIcon />
  </IconButton>

  <ExpandMore
    expand={expanded}
    onClick={handleExpandClick}
    aria-expanded={expanded}
    aria-label="show more"
  >
     

    <ExpandMoreIcon />
  </ExpandMore>
</CardActions>

<Collapse in={expanded} timeout="auto" unmountOnExit>
  <CardContent>
    <Typography paragraph>Method:</Typography>
    <Typography paragraph>
      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
      aside for 10 minutes.
    </Typography>
    <Typography paragraph>
      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
      medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
      occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
      large plate and set aside, leaving chicken and chorizo in the pan. Add
      pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
      stirring often until thickened and fragrant, about 10 minutes. Add
      saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
    </Typography>
    <Typography paragraph>
      Add rice and stir very gently to distribute. Top with artichokes and
      peppers, and cook without stirring, until most of the liquid is absorbed,
      15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
      mussels, tucking them down into the rice, and cook again without
      stirring, until mussels have opened and rice is just tender, 5 to 7
      minutes more. (Discard any mussels that don&apos;t open.)
    </Typography>
    <Typography>
      Set aside off of the heat to let rest for 10 minutes, and then serve.
    </Typography>
  </CardContent>
</Collapse>
</Card>

                <h1></h1>
                </div>
          )})}
        </div>
      );}