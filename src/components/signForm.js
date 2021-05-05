const SignForm = (props) => {

    return(
        <div>
            <h4>Name:</h4>
            <input type = 'text' value={props.Name} onChange={(e) => { props.setName(e.target.value) }}/>
            <h4>Zip-Code:</h4>
            <input type = 'text' value={props.Zipcode} onChange={(e) => { props.setZipcode(e.target.value) }}/>
           
        </div>
    )

}

export default SignForm