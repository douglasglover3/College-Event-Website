import {useState, useEffect} from "react";
import Axios from "axios"
import { API_URL } from '../info';
import {Form, Button} from "react-bootstrap";
import Comment from "./Comment"

export default function CommentList ({userID, eventID}) {
    const [comments, setComments] = useState([]);
    const [creating, setCreating] = useState(false);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        Axios.post(API_URL + "/interactions/getEventComments", {
            eventID: eventID
        })
        //Success
        .then((res) =>
            setComments(res.data))
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
                
    },[]);

    function createComment() {
        Axios.post(API_URL + "/interactions/createComment", {
            commentText: commentText,
            userID: userID,
            eventID: eventID
        })
        .then((res) => {
            comments.push(res.data);
            setComments(comments);
            setCreating(false);
        })
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    }

    return (
        <div style={{display:"flex", flexDirection:"column", padding:"20px", width:"60%"}}>
            {comments.map((comment) => <Comment key={comment.commentID} userID = {userID} comment={comment}/>)}
            {creating ?
                <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                    <div className="white" style={{padding:"20px", width:"80%"}}>
                        <div>
                            <h6>New comment</h6> 
                            <Form.Group className="mb-1" style={{marginTop:"10px"}}>
                                <Form.Control as="textarea" rows={3} value={commentText} onChange = {(input) =>{setCommentText(input.target.value)}}/>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="white"style={{paddingTop:"45px", width:"20%"}}>
                        <div>
                            <Button className="regular" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "60%", alignItems: "center", justifyContent: "center"}} onClick={() => createComment()}><p>Confirm</p></Button>
                            <Button className="dark" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "60%", alignItems: "center", justifyContent: "center"}} onClick={() => [setCreating(false), setCommentText("")]}><p>Cancel</p></Button>
                        </div>
                    </div>
                </div>
                :
                <Button className="regular" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "40%", alignSelf:"center",alignItems: "center", justifyContent: "center"}} onClick={() => setCreating(true)}><p>Create Comment</p></Button>
            }
        </div>
    );
}