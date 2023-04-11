import {SectionHeader} from '../Components/Section';
import {useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import NavigationButton from '../Components/NavigationButton';
import EventList from '../Components/EventList';
import Axios from "axios"
import { API_URL } from '../info';

export default function RSOPage({user}) {
    const rso = useLocation().state.rso;
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [memberList, setMemberList] = useState([]);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        Axios.post(API_URL + "/rsos/isUserMember", {
            userID: user.userID,
            rsoName: rso.rsoName
        })
        //Success
        .then((res) => {
            setMember(res.data.isMember)
            setAdmin(res.data.isAdmin)
        })
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));

        Axios.post(API_URL + "/users/getRSOUsers", {
            rsoName: rso.rsoName
        })
        //Success
        .then((res) =>
            setMemberList(res.data))
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    
        Axios.post(API_URL + "/events/getRSOEvents", {
            rsoName: rso.rsoName
        })
        //Success
        .then((res) =>
            setEvents(res.data))
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
                
    },[]);

    function leaveRso(){
        Axios.post(API_URL + "/rsos/leaveRSO", {
            userID: user.userID,
            rsoName: rso.rsoName
        })
        //Success
        .then((res) =>
            navigate("/RSO"))
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    }

    function joinRso(){
        Axios.post(API_URL + "/rsos/joinRSO", {
            userID: user.userID,
            rsoName: rso.rsoName
        })
        //Success
        .then((res) =>
            navigate("/RSO"))
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    }

    return (
        <div style={{display:"flex", flexDirection:"column", minWidth:"100%"}}>
            <SectionHeader color="dark">
                <h3>{rso.rsoName}</h3>
                {member ?
                    <Button className="white" type="button" style={{display: "flex", margin: "5px", height: "40px", alignItems: "center", justifyContent: "center"}} onClick={() => leaveRso()}><p>Leave RSO</p></Button>
                :
                    <Button className="white" type="button" style={{display: "flex", margin: "5px", height: "40px", alignItems: "center", justifyContent: "center"}} onClick={() => joinRso()}><p>Join RSO</p></Button>
                }
            </SectionHeader>
            <div style={{display:"flex", justifyContent:"space-between", marginInline:"100px"}}>
                <div style={{display:"flex",  width:"50%", flexDirection:"column"}}>
                    <SectionHeader color="regular"><h5>Upcoming Events</h5> {admin ? <NavigationButton className="offwhite" style={{width:"200px", height:"40px"}} urlTag={"/newEvent/" + rso.rsoName} extraData={{ rso: rso}}>Create New Event</NavigationButton> : <></>}</SectionHeader>
                    <EventList events={events}/>
                </div>
                <div style={{display:"flex", width:"30%", flexDirection:"column", alignSelf:"end"}}>
                    <SectionHeader color="regular"><h5>RSO Members</h5></SectionHeader>
                    <div className="light" style={{paddingBlock:"10px"}}>
                        {memberList.map((user) => 
                            <div className="white" style={{marginBlock:"5px", marginInline:"10px"}} key={user.userID}>
                                <h5 style={{padding:"5px"}} >{user.userID}</h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}