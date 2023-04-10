import "../index.css"
import {Form, Button} from 'react-bootstrap';
import {Section} from '../Components/Section';
import Select from "react-select"
import {useState} from "react";
import Axios from "axios"
import { API_URL } from '../info';
import {useNavigate, useLocation} from "react-router-dom"

export default function CreateEvent({user}) {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventType, setEventType] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const sponsor = useLocation().state.rso;
    const [errorText, setErrorText] = useState("");

    let navigate = useNavigate();
    function validateInputs()
    {
        if(eventName.length < 4)
        {
            setErrorText("Name is too short.");
            console.log("Name is too short.");
            return false;
        }
        return true;
    }

    async function createNewEvent() 
    {
        if(validateInputs())
            Axios.post(API_URL + "/events/createEvent", {
                eventName: eventName,
                eventType: eventType,
                eventDescription: eventDescription,
                eventDate: eventDate,
                eventTime: eventTime,
                contactPhone: contactPhone,
                contactEmail: contactEmail,
                sponsor: sponsor.rsoName
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
                    <h4 style={{marginBottom:"30px"}}>Create a New Event for {sponsor.rsoName}</h4>
                        <Form.Group className="mb-2">
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control type="text" placeholder='Event Name' onChange = {(input) =>{setEventName(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Event Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder='Event Description' onChange = {(input) =>{setEventDescription(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder='Event Date' onChange = {(input) =>{setEventDate(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" placeholder='Event Time' onChange = {(input) =>{setEventTime(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Contact Phone</Form.Label>
                            <Form.Control type="tel" placeholder='Contact Phone Number' onChange = {(input) =>{setContactPhone(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Contact Email</Form.Label>
                            <Form.Control type="email" placeholder='Contact Email Address' onChange = {(input) =>{setContactEmail(input.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Event Access</Form.Label>
                            <Select className="dropdown" options={[{value:"RSO", label: "RSO members only"}, {value:"Private", label: "University Students only"}]} onChange={(input) => {setEventType(input.value)}}/>
                        </Form.Group>
                        <Button className="regular" type="button" style={{height:"40px"}} onClick={() => createNewEvent()}>
                            Create
                        </Button>
                    <p style={{color: "red"}}>{errorText}</p>
                </div>
            </Section>
        </div>
    );
}