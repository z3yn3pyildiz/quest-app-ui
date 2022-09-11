import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { Button, InputAdornment, OutlinedInput } from '@mui/material';
import './Post.scss'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function PostForm(props) {
    const { userId, userName, refreshPots } = props;
    const [text, setText] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [isSend, setIsSend] = React.useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSend(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleSubmit = () => {
        savePost()
        setIsSend(true)
        setText("")
        setTitle("")
        refreshPots()
    }
    const savePost = () => {
        fetch("/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }
    const handleTitle = (value) => {
        setTitle(value)
        setIsSend(false)
    }
    const handleText = (value) => {
        setText(value)
        setIsSend(false)
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
                    title={<OutlinedInput
                        id="outlined-adornment-amount"
                        multiline placeholder='Title'
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={(i) => handleTitle(i.target.value)}
                    >
                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline placeholder='Text'
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <Button variant='contained' style={{ background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%', color: 'white' }} onClick={handleSubmit}>
                                        Post
                                    </Button>
                                </InputAdornment>
                            }>
                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
            <Snackbar open={isSend} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your post is sent..
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
export default PostForm;
