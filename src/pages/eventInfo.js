import {useContext, useEffect} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import { Link }  from 'react-router-dom'
import axios from 'axios'

const EventInfo = (props) => {
    // console.log(props);
    const {shouldRedirectState, redirectState, fetchSavedEvents} = useContext(UserContext)

    const [shouldRedirect, setShouldRedirect] = shouldRedirectState
    const [redirectTo, setRedirectTo] = redirectState

    useEffect(()=>{setShouldRedirect('false')},[])
    


    const saveEvent = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/events/save`,{
            eventId: props.id
        },{
            headers: {
                Authorization: userId
            }
        })
        console.log(res);
        setRedirectTo('/mycalendar')
        // fetchSavedEvents()
        if(res.data.message === 'event saved'){
            setShouldRedirect('true')
        }
    }




    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>Events</h1>
                <div className = 'info-container'>
                    <p><span className = 'bold'>{props.title}<br/>Type:</span> {props.type}</p>

                    <div className = 'event-job-text'>
                        <div><span className = 'bold'> Date:</span> {props.date}</div>
                        <div><span className = 'bold'> Time:</span> {props.start} - {props.end} </div>
                    </div>
                    <div><span className = 'bold'>Address:</span><br/> {props.address}, {props.zip} </div>
                   
                    <p className='info-description'> {props.description} </p>

                    <div className = 'event-job-text'>
                        <button> <Link to='/events'>Go Back</Link></button>
                        
                        <button onClick={()=>{saveEvent()}}>Save</button>
                    </div>

                </div>
                

            </div>

        </div>
    )
}

export default EventInfo