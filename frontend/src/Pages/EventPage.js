import {SectionHeader} from '../Components/Section';
import {useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import Axios from "axios"
import { API_URL } from '../info';

export default function EventPage({user}) {
    const event = useLocation().state.event;
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <SectionHeader color="dark">
                <h4>{event.sponsor}</h4>
            </SectionHeader>
            <div className="offwhite">
                <h3 style={{marginTop:"30px", marginInline:"100px"}}>{event.eventName}</h3>
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
                            <h5>Contact Info</h5>
                        </SectionHeader>
                        <p>{event.contactPhone}</p>
                        <p>{event.contactEmail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}