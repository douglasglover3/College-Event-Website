import "../index.css"
import {Form, Button} from 'react-bootstrap';
import {Section} from '../Components/Section';
import {useState} from "react";
import Axios from "axios"
import { API_URL } from '../info';
import {useNavigate} from "react-router-dom"

export default function CreateRso({user}) {
    const [rsoName, setRSOName] = useState("");

    const [errorText, setErrorText] = useState("");

    let navigate = useNavigate();

    function validateInputs()
    {
        if(rsoName.length < 4)
        {
            setErrorText("Name is too short.");
            console.log("Name is too short.");
            return false;
        }
        return true;
    }

    async function createNewRSO() 
    {
        if(validateInputs())
            Axios.post(API_URL + "/rsos/createRSO", {
                rsoName: rsoName,
                userID: user.userID
            })
             //Success
            .then((res) =>
            {
                navigate("/RSO");
            })
            //Failure
            .catch((res) =>
            {
                //User error
                if (res.response.status === 400){
                    setErrorText(res.response.data.message);
                    console.log(res.response.data.message);
                }
                //Unknown error
                else {
                    setErrorText("Registration failed due to server error. Please try again later.")
                    console.log(res.response.data.message);
                }
            })
    }


    return (
        <div>
            <Section color="white">
                <div style={{width:"70%"}}>
                    <h4 style={{marginBottom:"30px"}}>Create a New RSO</h4>
                        <Form.Group className="mb-2">
                            <Form.Label>RSO Name</Form.Label>
                            <Form.Control type="text" placeholder='RSO Name' onChange = {(input) =>{setRSOName(input.target.value)}}/>
                        </Form.Group>
                        <Button className="regular" type="button" onClick={() => createNewRSO()}>
                            Create
                        </Button>
                    <p style={{color: "red"}}>{errorText}</p>
                </div>
            </Section>
        </div>
    );
}