import {Section, SectionHeader} from '../Components/Section';
import EventList from '../Components/EventList';
import {useState, useEffect} from "react";
import Axios from "axios"
import { API_URL } from '../info';
import Select from "react-select";

export default function HomePage({user}) {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("None");
    useEffect(() => {
        getEvents();
    },[filter]);

    function getEvents() {
        Axios.post(API_URL + "/events/getUserEvents", {
            userID: user.userID,
            eventType: filter
        })
        //Success
        .then((res) => {
            setEvents(res.data)
            console.log(res.data)
        })
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    }

    return (
        <div>
            <SectionHeader>
                <h4 style={{color:"white"}}>Your Events </h4>
                <Select className="dropdown" defaultValue={{value:"None", label:"All"}}options={[{value:"None", label:"All"},{value:"RSO", label:"RSO Events"},{value:"Private", label:"Private Events"},{value:"Public", label:"Public events"}]} onChange={(input) => {setFilter(input.value)}}/>
            </SectionHeader>
            <Section color="white">
                
                <EventList events={events}/>
            </Section>
        </div>
    );
}