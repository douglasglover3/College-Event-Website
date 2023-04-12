import {SectionHeader} from '../Components/Section';
import {RSOList} from '../Components/RSOList';
import {useState, useEffect} from "react";
import NavigationButton from '../Components/NavigationButton';
import Axios from "axios"
import { API_URL } from '../info';


export default function UserRSOs({user}) {
    const [rsos, setRSOs] = useState([]);

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
                <h3>Your RSOs</h3>
            </SectionHeader>
            <RSOList rsos={rsos}/>
            <div style={{display: "flex", justifyContent:"center", margin: "20px", width:"100%"}}>
                <NavigationButton className="white" style={{padding: "10px", margin: "5px", width:"300px"}} urlTag="/newRSO"><h5>Create New RSO</h5></NavigationButton>
            </div>
        </div>
    );
}