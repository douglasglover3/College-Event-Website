import {Section, SectionHeader} from '../Components/Section';
import {useState, useEffect} from "react";
import {RSOList} from '../Components/RSOList';
import EventList from '../Components/EventList';
import Axios from "axios"
import { API_URL } from '../info';
import {Form, Button} from 'react-bootstrap';

export default function UniversityPage({user}) {
    const [university, setUniversity] = useState({});
    const [rsos, setRsos] = useState([]);
    const [events, setEvents] = useState([]);

    const [editedProfile, setEditedProfile] = useState(university);
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        Axios.post(API_URL + "/universities/getUniversityData", {
            universityName: user.universityName
        })
        //Success
        .then((res) => {
            setUniversity(res.data[0])
            setEditedProfile(res.data[0])
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

    function editProfile() {
        Axios.post(API_URL + "/universities/setUniversityData", {
            university: editedProfile
        })
        //Success
        .then((res) => {
            setUniversity(editedProfile)
        })
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    }
    

    return (
        <div>
            {editing ?
                <div style={{display:"flex", flexDirection:"column"}}>
                    <SectionHeader color="dark">
                        <h3>Editing Profile</h3>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <Button className="white" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "200px", alignItems: "center", justifyContent: "center"}} onClick={() => [setEditing(false), editProfile()]}>
                                Confirm
                            </Button> 
                            <Button className="light" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "200px", alignItems: "center", justifyContent: "center"}} onClick={() => [setEditing(false), setEditedProfile(university)]}>
                                Cancel
                            </Button> 
                        </div>
                    </SectionHeader>
                    <div style={{display:"flex", justifyContent:"space-between", marginInline:"100px"}}>
                        <div style={{display:"flex",  width:"60%", flexDirection:"column"}}>
                            <SectionHeader color="regular"><h4>{university.universityName}</h4></SectionHeader>
                            <div className="white">
                                <div className="white" style={{width:"100%"}}>
                                    <Form.Group className="mb-1" style={{marginInline:"50px", marginBlock:"30px"}}>
                                        <Form.Control as="textarea" rows={8} defaultValue={university.description} onChange = {(input) =>{editedProfile.description = input.target.value}}/>
                                    </Form.Group>
                                </div>
                                <div className="light" style={{width:"100%", paddingInline:"40px", paddingBlock:"10px"}}>
                                    <Form.Group className="mb-1" style={{marginInline:"50px", marginBlock:"30px"}}>
                                        <Form.Control type="text" defaultValue={university.locationName} placeholder='Enter location' onChange = {(input) =>{editedProfile.locationName = input.target.value}}/>
                                    </Form.Group>
                                    <Form.Group className="mb-1" style={{marginInline:"50px", marginBlock:"30px"}}>
                                        <Form.Control type="number" defaultValue={university.numOfStudents} placeholder='Enter number of students ' onChange = {(input) =>{editedProfile.numOfStudents = input.target.value}}/>
                                    </Form.Group>
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
            :
                <div style={{display:"flex", flexDirection:"column"}}>
                    <SectionHeader color="dark">
                        <h3>University Profile</h3>
                        {user.type == "Super Admin" ?
                            <Button className="white" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "200px", alignItems: "center", justifyContent: "center"}} onClick={() => [setEditing(true)]}>
                                Edit Profile
                            </Button> 
                            :
                            <></>
                        }
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
            }
        </div>
    );
}