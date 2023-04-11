
import {useState, useEffect} from "react";
import Axios from "axios"
import { API_URL } from '../info';
import {AiOutlineStar, AiFillStar} from "react-icons/ai";

export default function Rating({userID, eventID}) {
    const [rating, setRating] = useState(0);
    const [color, setColor] = useState("slateblue");

    useEffect(() => {
        Axios.post(API_URL + "/interactions/getUserRating", {
            userID: userID,
            eventID: eventID
        })
        //Success
        .then((res) =>
        {
            //User has not rated event
            if(res.data === '') 
            {
                Axios.post(API_URL + "/interactions/getEventRating", {
                    userID: userID,
                    eventID: eventID
                })
                .then((res2) =>
                {
                    setRating(res2.data)
                    setColor("slateblue");
                })
                 //Failure
                .catch((res2) =>
                    console.log(res2.response.data.message));
            }
            //User has rated event
            else {
                setRating(res.data.rating);
                setColor("gold");
            }
        })
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
                
    },[]);

    function rateEvent(rating) {
        
        Axios.post(API_URL + "/interactions/setRating", {
            userID: userID,
            eventID: eventID,
            rating: rating
        })
        //Success
        .then((res) =>
        {
            console.log(res)
            setRating(rating)
            setColor("gold");
        })
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    }

    return (
        <div style={{width:"200px", paddingBlock:"5px"}}>
            <button style={{border:"none", backgroundColor:"transparent", padding:"0px"}} onClick={() => rateEvent(1)}>
                {rating < 0.5 ? <AiOutlineStar color={color} size={30}/> : <AiFillStar color={color} size={30}/>}
            </button>
            <button style={{border:"none", backgroundColor:"transparent", padding:"0px"}} onClick={() => rateEvent(2)}>
                {rating < 1.5 ? <AiOutlineStar color={color} size={30}/> : <AiFillStar color={color} size={30}/>}
            </button>
            <button style={{border:"none", backgroundColor:"transparent", padding:"0px"}} onClick={() => rateEvent(3)}>
                {rating < 2.5 ? <AiOutlineStar color={color} size={30}/> : <AiFillStar color={color} size={30}/>}
            </button>
            <button style={{border:"none", backgroundColor:"transparent", padding:"0px"}} onClick={() => rateEvent(4)}>
                {rating < 3.5 ? <AiOutlineStar color={color} size={30}/> : <AiFillStar color={color} size={30}/>}
            </button>
            <button style={{border:"none", backgroundColor:"transparent", padding:"0px"}} onClick={() => rateEvent(5)}>
                {rating < 4.5 ? <AiOutlineStar color={color} size={30}/> : <AiFillStar color={color} size={30}/>}
            </button>
        </div>
    );
}