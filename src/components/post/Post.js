import React, { useState, useEffect } from "react"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { Link } from 'react-router-dom'
import Comment from '../comment/Comment.js'
import CommentForm from '../comment/CommentForm.js'
import Container from '@mui/material/Container';
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


function Post(props) {
  const { title, text, userId, userName, postId, likes } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = React.useState(null)
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = React.useState([])
  const [isLiked, setIsLiked] = React.useState(false)
  const [likeCount, setLikeCount] = React.useState(likes.length || 0)
  const [likeId, setLikeId] = React.useState(null)
  const isInitalMount = React.useRef(true)

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };
  const checkLikes = () => {
    var likeControl = likes.find((like => like.userId === userId))
    if (likeControl != null) {
      setLikeId(likeControl.id)
      setIsLiked(true)
    }
  }
  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result)
        },
        (error) => {
          setIsLoaded(true);
          setError(error)
        }
      )
  }
  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
  }
  const deleteLike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    if (isInitalMount.current) isInitalMount.current = false
    else refreshComments()
  }, [commentList])

  useEffect(() => { checkLikes() }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      saveLike()
      setLikeCount(likeCount + 1)
    }
    else {
      deleteLike()
      setLikeCount(likeCount - 1)
    }
  }
  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 800, textAlign: 'left', margin: 4 }}>
        <CardHeader
          avatar={
            <Link to={{ pathname: '/users/' + userId }} className='text-link'>
              <Avatar style={{ background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%' }} aria-label="recipe">
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
            <FavoriteIcon style={isLiked ? { color: "red" } : { color: "grey" }} />
          </IconButton>{likeCount}
          <ExpandMore
            onClick={handleExpandClick}
            aria-label="show more"
          >
            <QuestionAnswerOutlinedIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Container fixed>
              {error ? 'error' :
                isLoaded ? commentList.map(comment => (
                  <Comment userId={1} userName={'USER'} text={comment.text}></Comment>
                )) : "loading"}
              <CommentForm userId={1} userName={'USER'} postId={postId}></CommentForm>
            </Container>
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  )
}
export default Post;
