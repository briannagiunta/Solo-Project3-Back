import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import axios from 'axios'
import User from '../components/user'
const MyCommunity = (props) =>{
    const {userState, usersFriendsState, fetchFriends, pendingRequestsState, fetchPending, friendRequestsState, fetchFriendRequests } = useContext(UserContext)
    const [user,setUser] = userState
    const [usersFriends,setUsersFriends] = usersFriendsState
    const [pendingRequests, setPendingRequests] = pendingRequestsState
    const [friendRequests, setFriendRequests] = friendRequestsState
    const [view, setView] = useState('')

    useEffect(()=>{fetchFriends()},[])
    useEffect(()=>{fetchFriendRequests()},[])
    useEffect(()=>{fetchPending()},[])
    useEffect(()=>{setView('My Friends')},[])


    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>Friends</h1>
                <select value={view} onChange={(e) => { setView(e.target.value) }}>
                    <option value="My Friends">My Friends</option>
                    <option value="Friend Requests">Friend Requests</option>
                    <option value="Pending Requests">Pending Requests</option>
                </select>
                <div className = 'connect-container'> 
                    {view === 'My Friends' &&
                        usersFriends.map(req=>
                            <User key = {req.user.id} id = {req.user.id} name = {req.user.name} hereFor = {req.user.hereFor} view = 'friend' />
                        )
                    }

                    {view === 'Pending Requests' &&
                        pendingRequests.map(req=>
                            <User key = {req.user.id} id = {req.user.id} name = {req.user.name} hereFor = {req.user.hereFor} view = 'pending' />
                        )
                    }

                    {view === 'Friend Requests' &&
                        friendRequests.map(req=>
                            <User key = {req.friend.id} id = {req.friend.id} name = {req.friend.name} hereFor = {req.friend.hereFor} view = 'request' />
                        )
                    }
                
                </div>

            </div>

        </div>
    )
}

export default MyCommunity