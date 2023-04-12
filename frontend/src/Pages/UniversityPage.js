import {Section, SectionHeader} from '../Components/Section';
import {useState, useEffect} from "react";
import {RSOList} from '../Components/RSOList';
import EventList from '../Components/EventList';
import Axios from "axios"
import { API_URL } from '../info';

export default function UniversityPage({user}) {
    const [university, setUniversity] = useState({universityName: user.universityName});
    const [rsos, setRsos] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        Axios.post(API_URL + "/universities/getUniversityData", {
            universityName: user.universityName
        })
        //Success
        .then((res) => {
            setUniversity(res.data[0])
            Axios.post(API_URL + "/rsos/getUniversityRSOs", {
                universityName: res.data[0].universityName
            })
            //Success
            .then((res) =>
                setRsos(res.data))
            //Failure
            .catch((res) =>
                console.log(res.response.data.message));
            Axios.post(API_URL + "/events/getUniversityEvents", {
                universityName: res.data[0].universityName
            })
            //Success
            .then((res) =>
                setEvents(res.data))
            //Failure
            .catch((res) =>
                console.log(res.response.data.message));
        })
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
        
    },[]);
    

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <SectionHeader color="dark">
                <h3>University Profile</h3>
            </SectionHeader>
            <div style={{display:"flex", justifyContent:"space-between", marginInline:"100px"}}>
                <div style={{display:"flex",  width:"60%", flexDirection:"column"}}>
                    <SectionHeader color="regular"><h4>{university.universityName}</h4></SectionHeader>
                    <div className="white">
                        <div className="white" style={{width:"100%"}}>
                            <p style={{paddingInline:"60px", paddingBlock:"20px"}}>{university.description}</p>
                        </div>
                        <div className="light" style={{width:"100%", paddingInline:"40px", paddingBlock:"10px"}}>
                            <p><b>Location: </b>{university.locationName}</p>
                            <p><b>Student Population: </b>{university.numOfStudents}</p>
                        </div>
                    </div>
                    <SectionHeader color="regular"><h5>Upcoming Public Events</h5></SectionHeader>
                    <EventList events={events}/>
                </div>
                <div style={{display:"flex", width:"30%", flexDirection:"column"}}>
                    <SectionHeader color="regular">
                        <h4>University RSOs</h4>
                    </SectionHeader>
                    <RSOList rsos={rsos}/>
                </div>
            </div>
        </div>

    );
}