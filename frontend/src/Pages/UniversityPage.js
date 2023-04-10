import {SectionHeader} from '../Components/Section';
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import {RSOList} from '../Components/RSOList';
import Axios from "axios"
import { API_URL } from '../info';

export default function UniversityPage({user}) {
    const [university, setUniversity] = useState({universityName: ""});
    const [rsos, setRsos] = useState([]);

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
            <div style={{display:"flex", width:"30%", flexDirection:"column", alignSelf:"end"}}>
                <SectionHeader color="regular">
                    <h4>{"University RSOs"}</h4>
                </SectionHeader>
                <RSOList rsos={rsos} footer={<></>}/>
            </div>
        </div>

    );
}