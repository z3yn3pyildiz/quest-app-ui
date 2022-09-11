import Post from '../post/Post.js'
import React, { useState, useEffect } from "react"
import './Home.scss'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PostForm from '../post/PostForm.js';

function Home() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [postList, setPostList] = useState([])

    const refreshPots = () => {
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
    }
    useEffect(() => {
        refreshPots()
    }, [postList])

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
                    <PostForm userName={"zeynep"} userId={1} refreshPots={refreshPots}></PostForm>
                    {postList.map(post => (
                        <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                    ))}
                </Container>
            </React.Fragment>
        );
    }
}
export default Home;