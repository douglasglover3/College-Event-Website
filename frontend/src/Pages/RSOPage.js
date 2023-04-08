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
        <SectionHeader color="dark">
            <h3>{rso.rsoName}</h3>
            {member ?
                <Button className="white" type="button" style={{display: "flex", margin: "5px", height: "40px", alignItems: "center", justifyContent: "center"}} onClick={() => leaveRso()}><p>Leave RSO</p></Button>
            :
                <Button className="white" type="button" style={{display: "flex", margin: "5px", height: "40px", alignItems: "center", justifyContent: "center"}} onClick={() => joinRso()}><p>Join RSO</p></Button>
            }

        </SectionHeader>
    );
}