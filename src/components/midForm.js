const MidForm = (props) => {
    return(
        <div>
            <div>Type:</div>
            <input type = 'text' onChange={(e)=>(props.setType(e.target.value))} />
            <div>ZipCode:</div>
            <input type = 'text' onChange={(e)=>(props.setZipcode(e.target.value))} /> 
        </div>

    )
}

export default MidForm