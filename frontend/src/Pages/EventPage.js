import {SectionHeader} from '../Components/Section';
import {useNavigate, useLocation} from "react-router-dom";
import CommentList from "../Components/CommentList"
import Rating from "../Components/Rating"
import Axios from "axios"
import { API_URL } from '../info';
import {Button} from 'react-bootstrap';

export default function EventPage({user}) {
    const event = useLocation().state.event;
    let navigate = useNavigate();
    console.log(user.userType, event.eventType)
    function approveEvent() {
        Axios.post(API_URL + "/events/approveEvent", {
            eventID: event.eventID
        })
        .then((res) =>
            navigate("/RSO"))
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    }

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <SectionHeader color="dark">
                <h4>{event.sponsor}</h4>
                {(user.type == "Super Admin" && event.eventType == "Unauthorized") ? 
                    <Button className="light" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "200px", alignItems: "center", justifyContent: "center"}} onClick={() => approveEvent()}>
                        Approve Event
                    </Button> 
                : <></>}
            </SectionHeader>
            <div className="offwhite">
                <div style={{marginInline:"100px", marginTop:"30px"}}>
                    <h3 >{event.eventName}</h3>
                    <Rating userID={user.userID} eventID={event.eventID}/>
                </div>
                <div style={{display:"flex", marginTop:"30px", marginInline:"100px"}}>
                    
                    <div style={{marginRight:"60px"}}>
                        <SectionHeader color="regular">
                            <h5>Description</h5>
                        </SectionHeader>
                        <p>{event.eventDescription}</p>
                    </div>
                    <div style={{marginRight:"60px"}}>
                        <SectionHeader color="dark">
                            <h5>Time and Date</h5>
                        </SectionHeader>
                        <p>{event.eventTime} on {event.eventDate}</p>
                        <SectionHeader color="dark">
                            <h5>Location</h5>
                        </SectionHeader>
                        <p>{event.locationName}</p>
                        <SectionHeader color="dark">
                            <h5>Contact Info</h5>
                        </SectionHeader>
                        <p>{event.contactPhone}</p>
                        <p>{event.contactEmail}</p>
                    </div>
                </div>
            </div>
            <div className="light">
                <SectionHeader color="regular">Comments</SectionHeader>
                <div style={{display:"flex", marginTop:"30px", marginInline:"100px"}}>
                    <CommentList userID={user.userID} eventID={event.eventID}/>
                </div>
            </div>
        </div>
    );
}