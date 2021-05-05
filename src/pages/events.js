import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import Event from '../components/event'
const Events = (props) =>{
    const {userState, allEventsState, fetchAllEvents} = useContext(UserContext)
    const [user,setUser] = userState
    const [allEvents, setAllEvents] = allEventsState
    const [Date, setDate] = useState('')
    const [Type,setType] = useState('')
    const [Zipcode, setZipcode] = useState('')

    useEffect(()=>{fetchAllEvents()},[])

    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>Events</h1>
                <div className = 'events-jobs-container'>

                    <div className = 'filter-event-job'>
                        <div>Date:</div>
                        <input type = 'text' onChange={(e)=>(setDate(e.target.value))} />
                        <div>Type:</div>
                        <input type = 'text' onChange={(e)=>(setType(e.target.value))} />
                        <div>ZipCode:</div>
                        <input type = 'text' onChange={(e)=>(setZipcode(e.target.value))} /> 
                    </div>

                    <div className = 'event-job-list'>
                        {allEvents.map(event => 
                            <Event key = {event.id} event = {event} />
                            )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Events