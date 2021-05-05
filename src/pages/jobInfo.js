import {useContext, useEffect} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import {Link} from 'react-router-dom'
import axios from 'axios'

const JobInfo = (props) => {
    // console.log(props)
    const {shouldRedirectState, redirectState, fetchSavedJobs} = useContext(UserContext)

    const [shouldRedirect, setShouldRedirect] = shouldRedirectState
    const [redirectTo, setRedirectTo] = redirectState

    useEffect(()=>{setShouldRedirect('false')},[])

    const saveJob = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/jobs/save`,{
            jobId: props.id
        },{
            headers: {
                Authorization: userId
            }
        })
        console.log(res);
        setRedirectTo('/mycalendar')
        // await fetchSavedJobs()
        if(res.data.message === 'job saved'){
            setShouldRedirect('true')
        }
    }


    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>Job Listings</h1>
                <div className = 'info-container'>

                    <span className = 'bold'>{props.title}</span>

                    <div className = 'event-job-text'>
                        <div><span className = 'bold'> Type: </span>{props.type}</div>
                        <div><span className = 'bold'> Zip:</span> {props.zip}</div>
                    </div>

                    <p className='info-description'> {props.description} </p>

                    <div className = 'event-job-text'>
                    <button> <Link to='/jobs'>Go Back</Link></button>
                        
                    <button onClick={()=>{saveJob()}}>Save</button>

                    </div>

                </div>
                

            </div>

        </div>
    )
}

export default JobInfo