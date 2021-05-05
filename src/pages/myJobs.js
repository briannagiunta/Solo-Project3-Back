import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import LinkButton from '../components/linkButton'
import Job from '../components/job'
import axios from 'axios'

const MyJobs = (props) =>{
    const {userState, postState, shouldRedirectState} = useContext(UserContext)
    const [user,setUser] = userState
    const [shouldRedirect, setShouldRedirect] = shouldRedirectState
    const [addedJobs, setAddedJobs] = useState([])

    const fetchAddedJobs = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/jobs/added`,{
            headers:{
                Authorization: userId
            }
        })
        console.log(res);
        setAddedJobs(res.data.jobs)
    }

    useEffect(()=>{fetchAddedJobs()},[])
    useEffect(()=>{setShouldRedirect('false')})
    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>My Job Listings</h1>
                <LinkButton path= './addnew' text = 'Add New Job Listing' class= 'add-new' setAddFormState = {props.setAddFormState} />
                <div className = 'event-job-list'>
                    {addedJobs.map(job => 
                        <Job key = {job.id} job = {job} />
                        )}
                </div>

            </div>

        </div>
    )
}

export default MyJobs