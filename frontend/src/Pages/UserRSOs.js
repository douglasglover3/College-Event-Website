import {SectionHeader} from '../Components/Section';
import {RSOList} from '../Components/RSOList';
import {useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import NavigationButton from '../Components/NavigationButton';
import Axios from "axios"
import { API_URL } from '../info';


export default function UserRSOs({user}) {
    const [rsos, setRSOs] = useState([
        {rsoName: "Chess Club"},
        {rsoName: "Dumb Club"},
        {rsoName: "GDSA Club"},
    ]);

    function joinRso(){
        
    }

    useEffect(() => {
        Axios.post(API_URL + "/rsos/getUserRSOs", {
            userID: user.userID
        })
        //Success
        .then((res) =>
            setRSOs(res.data))
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    },[]);

    return (
        <div>
            <SectionHeader color="dark">
                <h3>Your RSOs</h3> <NavigationButton className="light" urlTag="/newRSO"><h5>Create RSO</h5></NavigationButton>
            </SectionHeader>
            <RSOList rsos={rsos} footer={
                <div style={{display: "flex", justifyContent:"center", margin: "20px", width:"100%"}}>
                    <Button className="white" type="button" style={{padding: "10px", width:"300px"}} onClick={() => joinRso()}><h5>Join New RSO</h5></Button>
                </div>
            }/>
        </div>
    );
}