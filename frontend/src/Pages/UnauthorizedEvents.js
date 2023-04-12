import {Section, SectionHeader} from '../Components/Section';
import {useState, useEffect} from "react";
import {RSOList} from '../Components/RSOList';
import EventList from '../Components/EventList';
import Axios from "axios"
import { API_URL } from '../info';

export default function UnauthorizedEvents({user}) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        Axios.post(API_URL + "/events/getUnauthorizedEvents", {
            universityName: user.universityName
        })
        //Success
        .then((res) => {
            setEvents(res.data)
        })
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
        
    },[]);
    

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{display:"flex", justifyContent:"space-between", marginInline:"100px"}}>
                <div style={{display:"flex",  width:"100%", flexDirection:"column"}}>
                    <SectionHeader color="regular"><h5>Unauthorized Public Events</h5></SectionHeader>
                    <EventList events={events}/>
                </div>
            </div>
        </div>

    );
}