import Post from '../post/Post.js'
import React, { useState, useEffect } from "react"
import './Home.scss'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function Home() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [postList, setPostList] = useState([])

    useEffect(() => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setPostList(result)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])

    if (error) {
        return <div> Error !</div>
    }
    else if (!isLoaded) {
        return <div> Loading ...</div>
    }
    else {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container className='container' maxWidth="sm">
                    {postList.map(post => (
                        <Post userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                    ))}
                </Container>
            </React.Fragment>
        );
    }
}
export default Home;