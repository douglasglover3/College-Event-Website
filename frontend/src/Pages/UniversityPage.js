import {SectionHeader} from '../Components/Section';
import {useState, useEffect} from "react";
import {RSOList} from '../Components/RSOList';
import EventList from '../Components/EventList';
import Axios from "axios"
import { API_URL } from '../info';

export default function UniversityPage({user}) {
    const [university, setUniversity] = useState({universityName: ""});
    const [rsos, setRsos] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        Axios.post(API_URL + "/universities/getUserUniversity", {
            userID: user.userID
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
                <h3>{university.universityName}</h3>
            </SectionHeader>
            <div style={{display:"flex", justifyContent:"space-between", marginInline:"100px"}}>
                <div style={{display:"flex",  width:"50%", flexDirection:"column"}}>
                    <SectionHeader color="regular"><h5>Upcoming Public Events</h5></SectionHeader>
                    <EventList events={events} footer={<></>}/>
                </div>
                <div style={{display:"flex", width:"30%", flexDirection:"column", alignSelf:"end"}}>
                    <SectionHeader color="regular">
                        <h4>University RSOs</h4>
                    </SectionHeader>
                    <RSOList rsos={rsos} footer={<></>}/>
                </div>
            </div>
        </div>

    );
}