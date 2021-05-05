import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import LinkButton from '../components/linkButton'
import axios from 'axios'
import Post from '../components/post'

const MyPosts = (props) =>{
    const {userState, shouldRedirectState} = useContext(UserContext)
    const [user,setUser] = userState
    const [shouldRedirect, setShouldRedirect] = shouldRedirectState
    const [userPosts, setUserPosts] = useState([])

    const fetchUserPosts = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/posts`,{
            headers:{
                Authorization: userId
            }
        })
        // console.log(res);
        setUserPosts(res.data.posts)
    }
    useEffect(()=>{fetchUserPosts()},[])
    useEffect(()=>{setShouldRedirect('false')})

    return(
        <div className = 'page-container'>
            <UserContainer />
            <div className = 'content-container'>
                <h1>My Posts</h1>
                <LinkButton path= './addnew' text = 'Add New Post' class= 'add-new' setAddFormState = {props.setAddFormState} />
                <div className = 'post-container'>
                    {userPosts.map(post=>
                        <Post key = {post.id} title = {post.title} description = {post.description} />
                    )}
                </div>

            </div>

        </div>
    )
}

export default MyPosts