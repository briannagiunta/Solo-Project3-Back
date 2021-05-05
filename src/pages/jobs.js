import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/userContext'
import UserContainer from '../components/userContainer'
import Job from '../components/job'

const Jobs = (props) =>{
    const {userState, allJobsState, fetchAllJobs} = useContext(UserContext)
    const [user,setUser] = userState
    const [allJobs, setAllJobs] = allJobsState
    const [Type,setType] = useState('')
    const [Zipcode, setZipcode] = useState('')

    useEffect(()=>{fetchAllJobs()},[])
    
    return(
        <div className = 'page-container'>
            <UserContainer />

            <div className = 'content-container'>
                <h1>Job Listings</h1>
                <div className = 'events-jobs-container'>
                    <div className = 'filter-event-job'>
                        <div>Type:</div>
                        <input type = 'text' onChange={(e)=>(setType(e.target.value))} />
                        <div>ZipCode:</div>
                        <input type = 'text' onChange={(e)=>(setZipcode(e.target.value))} /> 
                    </div>

                    <div className = 'event-job-list'>
                        {allJobs.map(job => 
                            <Job key = {job.id} job = {job} />
                            )}
                    </div>

                </div>
                

            </div>

        </div>
    )
}

export default Jobs