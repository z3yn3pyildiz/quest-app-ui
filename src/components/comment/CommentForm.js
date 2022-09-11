import { Button, InputAdornment, OutlinedInput } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';

function CommentForm(props) {
    const { postId, userId, userName } = props
    const [text,setText] =React.useState("")

    const handleSubmit = () => {
        saveComment()
        setText("")
    }
    const handleChange=(value)=>{
        setText(value)
    }
    const saveComment = () => {
        fetch("/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    text: text
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }
    return (
        <React.Fragment>
            <CardContent>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    multiline placeholder='Text'
                    inputProps={{ maxLength: 250 }}
                    onChange ={(i)=> handleChange(i.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <Link to={{ pathname: '/users/' + userId }}>
                                <Avatar arial-label='recipe'>
                                    {userName.charAt(0).toUpperCase()}
                                </Avatar>
                            </Link>
                        </InputAdornment>
                    }
                    style={{ color: 'black', backgroundColor: 'white' }}
                    endAdornment={
                        <InputAdornment position='end'>
                        <Button variant='contained' style={{ background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%', color: 'white' }} onClick={handleSubmit}>
                            Commit
                        </Button>
                    </InputAdornment>
                    }
                    value={text}
                    >
                </OutlinedInput>
            </CardContent>
        </React.Fragment>
    )
}

export default CommentForm;