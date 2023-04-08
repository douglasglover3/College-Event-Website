import "../index.css"
import { Form, Button} from 'react-bootstrap';
import {Section} from '../Components/Section';
import {useState} from "react";
import Axios from "axios"
import { API_URL } from '../info';
import sha256 from "js-sha256"
import {useNavigate} from "react-router-dom"

export default function Login({setUser}) {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const [errorText, setErrorText] = useState("")

    let navigate = useNavigate();
    
    async function loginUser()
    {
        if(validateInputs())
            Axios.post(API_URL + "/users/loginUser", {
                userID: userID,
                hashedPass: await getHash(password),
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
                    setErrorText(res.response.data.message)
                    console.log(res.response.data.message);
                }
                //Unknown error
                else {
                    setErrorText("Login failed due to server error. Please try again later.")
                    console.log("Login failed due to server error. Please try again later.");
                }
            })
    }

    function validateInputs()
    {
        if(userID === "")
        {
            setErrorText("UserID must be filled.")
            console.log("UserID must be filled.")
            return false;
        }
        if(password === "")
        {
            setErrorText("Password must be filled.")
            console.log("Password must be filled.")
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
                    <h4 style={{marginBottom:"30px"}}>Login To Your Account</h4>
                        <Form.Group className="mb-2">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="username" placeholder='Enter user ID' onChange = {(input) =>{setUserID(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder='Enter password' onChange = {(input) =>{setPassword(input.target.value)}}/>
                        </Form.Group>
                        <p>Don't have an account? <b style={{cursor: "pointer"}} onClick={() => navigate("/register")}> Click here to register. </b></p>
                        <Button className="regular" type="button" onClick={() => loginUser()}>
                            Login
                        </Button>
                    <p style={{color: "red"}}>{errorText}</p>
                </div>
            </Section>
        </div>
    );
}