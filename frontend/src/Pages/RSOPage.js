import {SectionHeader} from '../Components/Section';
import {useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import Axios from "axios"
import { API_URL } from '../info';

export default function RSOPage({user}) {
    const rso = useLocation().state.rso;
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        Axios.post(API_URL + "/rsos/isUserMember", {
            userID: user.userID,
            rsoName: rso.rsoName
        })
        //Success
        .then((res) =>
            setMember(res.data))
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
        <div style={{display:"flex", flexDirection:"column"}}>
            <SectionHeader color="dark">
                <h3>{rso.rsoName}</h3>
                {member ?
                    <Button className="white" type="button" style={{display: "flex", margin: "5px", height: "40px", alignItems: "center", justifyContent: "center"}} onClick={() => leaveRso()}><p>Leave RSO</p></Button>
                :
                    <Button className="white" type="button" style={{display: "flex", margin: "5px", height: "40px", alignItems: "center", justifyContent: "center"}} onClick={() => joinRso()}><p>Join RSO</p></Button>
                }
            </SectionHeader>
            <div style={{display:"flex", width:"20%", flexDirection:"column", alignSelf:"end"}}>
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
    );
}