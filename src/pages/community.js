import {useContext, useEffect} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import Post from '../components/post'

const Community = (props) =>{
    const {userState, postState, fetchPosts} = useContext(UserContext)
    const [user,setUser] = userState
    const [allPosts,setAllPosts] = postState

    useEffect(()=>{fetchPosts()},[])

    
    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>Community</h1>
                <div className = 'post-container'>
                    {allPosts.map(post=>
                        <Post key = {post.id} title = {post.title} description = {post.description} />
                    )}
                </div>
            </div>

        </div>
    )
}

export default Community