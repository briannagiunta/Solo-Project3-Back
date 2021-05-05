import {Link} from 'react-router-dom'

const Job = (props) =>{

    return(
        <div className = 'event-job-container' >
            <Link to={`/jobs/${props.job.id}`}>
                <span className = 'bold'>{props.job.title}</span><br/>
            </Link>


            
            <div className = 'event-job-text'>
              <div> Type: {props.job.type}</div>
              <div> Zip: {props.job.zip}</div>
            </div>

        </div>
    )
}

export default Job