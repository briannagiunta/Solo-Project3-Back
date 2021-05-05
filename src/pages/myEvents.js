import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import LinkButton from '../components/linkButton'
import axios from 'axios'
import Event from '../components/event'

const MyEvents = (props) =>{
    const {userState, postState, shouldRedirectState} = useContext(UserContext)
    const [user,setUser] = userState
    const [shouldRedirect, setShouldRedirect] = shouldRedirectState
    const [addedEvents, setAddedEvents] = useState([])

    const fetchAddedEvents = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/events/added`,{
            headers:{
                Authorization: user.id
            }
        })
        console.log(res);
        setAddedEvents(res.data.events)
    }

    useEffect(()=>{fetchAddedEvents()},[])

    useEffect(()=>{setShouldRedirect('false')})
    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>My Events</h1>
                <LinkButton path= './addnew' text = 'Add New Event' class= 'add-new' setAddFormState = {props.setAddFormState} />
                <div className = 'event-job-list'>
                    {addedEvents.map(event => 
                        <Event key = {event.id} event = {event} />
                        )}
                </div>
                

            </div>

        </div>
    )
}

export default MyEvents