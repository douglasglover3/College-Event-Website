import "../index.css"
import { Form, Button} from 'react-bootstrap';
import {Section} from '../Components/Section';
import {useState} from "react";
import Axios from "axios"
import { API_URL } from '../info';
import sha256 from "js-sha256"
import {useNavigate} from "react-router-dom"

export default function Register({setUser}) {
    const [userID, setUserID] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [university, setUniversity] = useState(null);

    const [errorText, setErrorText] = useState("")

    let navigate = useNavigate();
    
    async function registerUser()
    {
        if(validateInputs())
            Axios.post(API_URL + "/users/createUser", {
                userID: userID,
                hashedPass: await getHash(password),
                university: university,
                userType: "Student"
            })
             //Success
            .then((res) =>
            {
                setUser(res.data);
                navigate("/");
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

    function validateInputs()
    {
        if(password.length < 4)
        {
            setErrorText("Password is too short.");
            console.log("Password is too short.");
            return false;
        }
        if(password !== passwordConfirm)
        {
            setErrorText("Passwords do not match.");
            console.log("Passwords do not match.")
            return false;
        }
        return true;
    }

    async function getHash(password)
    {
        return await sha256(password);
    }

    return (
        <div>
            <Section color="white">
                <div style={{width:"70%"}}>
                    <h4 style={{marginBottom:"30px"}}>Register an Account</h4>
                        <Form.Group className="mb-2">
                            <Form.Label>University Name</Form.Label>
                            <Form.Control type="text" placeholder='University Name' onChange = {(input) =>{setUniversity(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="text" placeholder='Enter user ID' onChange = {(input) =>{setUserID(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder='Enter password' onChange = {(input) =>{setPassword(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder='Re-enter password' onChange = {(input) =>{setPasswordConfirm(input.target.value)}}/>
                        </Form.Group>
                        <p>Already have an account? <b style={{cursor: "pointer"}} onClick={() => navigate("/login")}> Click here. </b></p>
                        <Button className="regular" type="button" onClick={() => registerUser()}>
                            Register
                        </Button>
                    <p style={{color: "red"}}>{errorText}</p>
                </div>
            </Section>
        </div>
    );
}