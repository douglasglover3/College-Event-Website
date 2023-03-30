import "../index.css"
import { Form, Button} from 'react-bootstrap';
import {Section, SectionHeader} from '../Components/Section';
import {useState} from "react";
import Axios from "axios"
import { API_URL } from '../info';
import sha256 from "js-sha256"
import {useNavigate} from "react-router-dom"

export default function RegisterStudent({setUser}) {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [university, setUniversity] = useState("");

    let navigate = useNavigate();
    
    async function registerStudent()
    {
        if(validateInputs())
            Axios.post(API_URL + "/users/createStudent", {
                userID: userID,
                hashedPass: await getHash(password),
                university: university
            }).then((res) =>
            {
                if(res.statusText !== "OK")
                {
                    navigate("/error");
                }
                else {
                    setUser(res.data[0]);
                    navigate("/");
                }
            })
    }

    function validateInputs()
    {
        if(password !== passwordConfirm)
        {
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
                    <h4 style={{marginBottom:"30px"}}>Register as a Student</h4>
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
                        <p>Already have an account? Click here.</p>
                        <Button className="regular" type="button" onClick={() => registerStudent()}>
                            Register
                        </Button>
                </div>
            </Section>
        </div>
    );
}