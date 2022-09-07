import React from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { Link } from 'react-router-dom'
import './Post.scss'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function Post(props){
  const {title,text,userId,userName}=props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked,setLiked] = React.useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike =() =>{
    setLiked(!liked)
  }
  return(
    <React.Fragment>
    <Card sx={{ maxWidth: 800 , textAlign:'left', margin :4}}>
   <CardHeader
     avatar={
      <Link to={{ pathname: '/users/' + userId }} className='text-link'>
       <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
         {userName.charAt(0).toUpperCase()}
       </Avatar>
       </Link>
     }
     title={title}
   />
   <CardContent>
     <Typography variant="body2" color="text.secondary">
      {text}
     </Typography>
   </CardContent>
   <CardActions disableSpacing>
     <IconButton onClick={handleLike} aria-label="add to favorites">
       <FavoriteIcon style={liked?{color:"red"}:{color:"grey"}} />
     </IconButton>
     <ExpandMore
       onClick={handleExpandClick}
       aria-label="show more"
     >
       <QuestionAnswerOutlinedIcon />
     </ExpandMore>
   </CardActions>
   <Collapse in={expanded} timeout="auto" unmountOnExit>
     <CardContent>
      
     </CardContent>
   </Collapse>
 </Card>
 </React.Fragment>
  )
}
export default Post;
