import {useContext, useEffect} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import Event from '../components/event'
import Job from '../components/job'

const MyCalendar = (props) =>{
    const {userState, shouldRedirectState, savedEventsState, fetchSavedEvents, savedJobsState, fetchSavedJobs} = useContext(UserContext)
    const [user,setUser] = userState
    const [shouldRedirect, setShouldRedirect] = shouldRedirectState
    const [savedEvents, setSavedEvents] = savedEventsState
    const [savedJobs,setSavedJobs] = savedJobsState

    useEffect(()=>{setShouldRedirect('false')},[])
    useEffect(()=>{fetchSavedEvents()},[])




    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>Saved </h1>
                <div className = 'saved-container'>

                    <div className = 'saved'>
                        <h2>Jobs</h2>
                        {savedJobs.map(job =>
                            <Job key = {job.id} job = {job} />
                        )}

                    </div>
                    
                    <div className = 'saved'>
                        <h2>Events</h2>
                        {savedEvents.map(event =>
                            <Event key = {event.id} event = {event} />
                        )}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default MyCalendar