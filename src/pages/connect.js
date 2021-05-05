import {useContext, useEffect} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import User from '../components/user'

const Connect = (props) =>{
    const {userState, usersByZipState, fetchByZip, usersFriendsState, pendingRequestsState, friendRequestsState, fetchFriends,fetchPending, fetchFriendRequests } = useContext(UserContext)
    const [user,setUser] = userState
    const [usersByZip, setUsersByZip] = usersByZipState
    const [usersFriends,setUsersFriends] = usersFriendsState
    const [pendingRequests, setPendingRequests] = pendingRequestsState
    const [friendRequests, setFriendRequests] = friendRequestsState

    useEffect(()=>{fetchByZip()},[])
    useEffect(()=>{fetchFriends()},[])
    useEffect(()=>{fetchFriendRequests()},[])
    useEffect(()=>{fetchPending()},[])

    
    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>Users in {user.zip} </h1>
                <div className = 'connect-container'>
                    {usersByZip.map((user)=>{
                       let friend = usersFriends.find(friend => friend.friend.id === user.id)
                       let pending = pendingRequests.find(pending => pending.user.id === user.id)
                       let request = friendRequests.find(request => request.friend.id === user.id)
                        if(friend){
                            return (<User key = {user.id} id = {user.id} name = {user.name} hereFor = {user.hereFor} view = 'friend' />)
                        }else if (pending){
                            return (<User key = {user.id} id = {user.id} name = {user.name} hereFor = {user.hereFor} view = 'pending' />)
                        }else if (request){
                            return (<User key = {user.id} id = {user.id} name = {user.name} hereFor = {user.hereFor} view = 'request' />)
                        }else{
                            return (<User key = {user.id} id = {user.id} name = {user.name} hereFor = {user.hereFor} view = 'connect' />)
                        }
                    })}
                </div> 
                

            </div>

        </div>
    )
}

export default Connect