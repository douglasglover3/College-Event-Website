import {useState, useEffect} from "react";
import Axios from "axios"
import { API_URL } from '../info';
import {Form, Button} from "react-bootstrap";

export default function Comment ({userID, comment}) {
    const [isCommenter, setIsCommenter] = useState(false);
    const [commentText, setCommentText] = useState(comment.commentText);
    const [editedText, setEditedText] = useState(comment.commentText);
    const [editing, setEditing] = useState(false)
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        Axios.post(API_URL + "/interactions/isCommenter", {
            userID: userID,
            commentID: comment.commentID
        })
        //Success
        .then((res) =>
            setIsCommenter(res.data))
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
                
    },[]);

    function editComment() {
        Axios.post(API_URL + "/interactions/editComment", {
            commentText: editedText,
            commentID: comment.commentID
        })
        .then((res) => 
        {
            setCommentText(editedText)
            setEditing(false)
        })
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    }

    function deleteComment() {
        Axios.post(API_URL + "/interactions/deleteComment", {
            commentID: comment.commentID
        })
        .then((res) =>
            setDeleted(true))
        //Failure
        .catch((res) =>
            console.log(res.response.data.message));
    }

    return (
        <div key={comment.commentID}  style={{width:"100%"}}>
            {deleted ?
                <></>
            :
                <div style={{marginBottom:"20px"}}>
                    {!editing ?
                        <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                            <div className="white" style={{padding:"20px", width:"80%"}}>
                                <div>
                                    <h6>{comment.userID}</h6> 
                                    <p>{commentText}</p>
                                </div>
                            </div>
                            <div className="white"style={{paddingTop:"10px", width:"20%"}}>
                                {isCommenter ?
                                    <div>
                                        <Button className="regular" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "60%", alignItems: "center", justifyContent: "center"}} onClick={() => setEditing(true)}><p>Edit</p></Button>
                                        <Button className="dark" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "60%", alignItems: "center", justifyContent: "center"}} onClick={() => deleteComment()}><p>Delete</p></Button>
                                    </div>
                                :
                                    <></>
                                }
                            </div>
                        </div>
                    :
                        <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                            <div className="white" style={{padding:"20px", width:"80%"}}>
                                <div>
                                    <h6>{comment.userID}</h6> 
                                    <Form.Group className="mb-1" style={{marginTop:"10px"}}>
                                        <Form.Control as="textarea" rows={3} defaultValue={editedText} onChange = {(input) =>{setEditedText(input.target.value)}}/>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="white"style={{paddingTop:"10px", width:"20%"}}>
                                {isCommenter ?
                                    <div>
                                        <Button className="regular" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "60%", alignItems: "center", justifyContent: "center"}} onClick={() => editComment()}><p>Confirm</p></Button>
                                        <Button className="dark" type="button" style={{display: "flex", margin: "5px", height: "40px", width: "60%", alignItems: "center", justifyContent: "center"}} onClick={() => [setEditing(false), setEditedText(commentText)]}><p>Cancel</p></Button>
                                    </div>
                                :
                                    <></>
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
}