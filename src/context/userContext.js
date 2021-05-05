import {useState, createContext, useEffect} from 'react'
import axios from 'axios'


const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user,setUser] = useState({})
    const [shouldRedirect, setShouldRedirect] = useState('')
    const [redirectTo, setRedirectTo] = useState('')
    const [allPosts, setAllPosts] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const [allJobs, setAllJobs] = useState([])
    const [savedEvents, setSavedEvents] = useState([])
    const [savedJobs, setSavedJobs] = useState([])
    const [usersFriends, setUsersFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    const [pendingRequests, setPendingRequests] = useState([])
    const [usersByZip, setUsersByZip] = useState([])
    const [userConvos,setUserConvos] = useState([])
    const [hasConvoWith, setHasConvoWith] = useState([])
    const [currentConvo, setCurrentConvo] = useState(0)
    const [convoName, setConvoName] = useState('')


    const getConvos = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/convos/getconvos`,{
            headers:{
                Authorization: userId
            }
        })
        setUserConvos(res.data.convos)
        fetchConvoUsers()
    }

    const fetchConvoUsers = async () => {
        let arr = []
        userConvos.forEach(async(convo)=>{
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/convos/users`,{
                id: convo.id
            })
            res.data.users.forEach((u)=>{
                if(u.email !== user.email){
                    arr.push( { id: convo.id, usernames: convo.usernames , createdAt: convo.createdAt , updatedAt: convo.updatedAt, user: u } )
                }
            })
        })
        setHasConvoWith(arr)
    }
  

    const fetchFriends = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/friendships/friends`,{
            headers:{
                Authorization: userId
            }
        })
        // console.log(res.data);
        setUsersFriends(res.data.acceptedFriends)
    }

    const fetchFriendRequests = async () =>{
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/friendships/recieved/pending`,{
            headers:{
                Authorization: userId
            }
        })
        setFriendRequests(res.data.requests)
    }

    const fetchPending = async () =>{
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/friendships/sent/pending`,{
            headers:{
                Authorization: userId
            }
        })
        setPendingRequests(res.data.requests)
    }



    const fetchUser = async () => {
        let userId = localStorage.getItem('userId') 
        if(userId){
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
                headers:{
                    Authorization: userId
                }
            })
            setUser(res.data.user)
        }
    }
    // useEffect(()=>{fetchUser()},[])

    const fetchAllUsers = async () =>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/all`)
        setAllUsers(res.data.allUsers)
    }

    const fetchByZip = async () =>{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/zip`,{
            zip: user.zip
        })
        setUsersByZip(res.data.users)
    }
    // useEffect(()=>{fetchByZip()},[])
    
    const fetchPosts = async () =>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/all`)
        setAllPosts(res.data.allPosts)
    }

    const fetchAllEvents = async () =>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/events/all`)
        setAllEvents(res.data.allEvents)
    }

    const fetchAllJobs = async () =>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/jobs/all`)
        setAllJobs(res.data.allJobs)
    }

    const fetchSavedEvents = async () =>{
        let userId = localStorage.getItem('userId') 
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/events/saved`,{
            headers: {
                Authorization: userId
            }
        })
        let arr = []
        res.data.events.forEach(async(event)=>{
            let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/events/${event.eventId}`)
            arr.push(response.data.event)
        })
        setSavedEvents(arr)
    }

    const fetchSavedJobs = async () =>{
        let userId = localStorage.getItem('userId') 
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/jobs/saved`,{
            headers: {
                Authorization: userId
            }
        })
        let arr = []
        if(res.data.message === 'saved jobs'){
            res.data.jobs.forEach(async(job)=>{
                let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/jobs/${job.jobId}`)
                arr.push(response.data.job)
            })

        }
        setSavedJobs(arr)
    }

    


    const state = {
        userState: [user,setUser],
        shouldRedirectState: [shouldRedirect, setShouldRedirect],
        redirectState: [redirectTo,setRedirectTo],
        postState: [allPosts, setAllPosts],
        allUsersState: [allUsers,setAllUsers],
        allEventsState: [allEvents,setAllEvents],
        allJobsState: [allJobs, setAllJobs],
        savedEventsState: [savedEvents,setSavedEvents],
        savedJobsState: [savedJobs, setSavedJobs],
        pendingRequestsState: [pendingRequests, setPendingRequests],
        friendRequestsState: [friendRequests, setFriendRequests],
        usersFriendsState: [usersFriends,setUsersFriends],
        usersByZipState: [usersByZip, setUsersByZip],
        userConvosState: [userConvos, setUserConvos],
        currentConvoState: [currentConvo, setCurrentConvo],
        convoNameState: [convoName, setConvoName],
        hasConvoWithState: [hasConvoWith, setHasConvoWith],
        fetchUser: fetchUser,
        fetchPosts: fetchPosts,
        fetchAllUsers: fetchAllUsers,
        fetchAllEvents: fetchAllEvents,
        fetchAllJobs: fetchAllJobs,
        fetchSavedEvents: fetchSavedEvents,
        fetchSavedJobs: fetchSavedJobs,
        fetchPending: fetchPending,
        fetchFriendRequests: fetchFriendRequests,
        fetchFriends: fetchFriends,
        fetchByZip: fetchByZip,
        getConvos: getConvos
        
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}