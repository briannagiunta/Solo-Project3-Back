const EndForm = (props) => {
    return(
        <div>
            <div>Date:</div>
            <input type = 'text' onChange={(e)=>(props.setDate(e.target.value))} />
            <div>Start Time:</div>
            <input type = 'text' onChange={(e)=>(props.setStart(e.target.value))} /> 
            <div>End Time:</div>
            <input type = 'text' onChange={(e)=>(props.setEnd(e.target.value))} /> 
            <div>Address:</div>
            <input type = 'text' onChange={(e)=>(props.setAddress(e.target.value))} /> 
        </div>

    )
}

export default EndForm