import { InputAdornment, OutlinedInput } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';


function Comment(props) {
    const { text, userId, userName } = props

    return (
        <React.Fragment>
            <CardContent>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    multiline placeholder='Text'
                    inputProps={{ maxLength: 25 }}
                    disabled
                    value={text}
                    startAdornment={
                        <InputAdornment position="start">
                            <Link to={{ pathname: '/users/' + userId }}>
                                <Avatar arial-label='recipe'>
                                    {userName.charAt(0).toUpperCase()}
                                </Avatar>
                            </Link>
                        </InputAdornment>
                    }
                    style={{ color: 'black', backgroundColor: 'white' }}>
                </OutlinedInput>
            </CardContent>
        </React.Fragment>
    )
}

export default Comment;