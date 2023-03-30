import "../index.css"
import { Form, Button} from 'react-bootstrap';
import {Section, SectionHeader} from '../Components/Section';
import {useState} from "react";
import {useNavigate} from "react-router-dom"

export default function AccountType() {
    let navigate = useNavigate();
    return (
        <div>
            <Section color="white">
                <div style={{width:"70%", display:"flex", flexDirection: "column", alignItems:"center"}}>
                    <h4 style={{marginBottom:"30px"}}>What are you registering as?</h4>
                        <Button style={{width:"70%", marginTop: "10px"}} className="regular" type="button" onClick={() => navigate("/register/student")}>
                            Student of a university
                        </Button>
                        <Button style={{width:"70%", marginTop: "10px"}} className="regular" type="button" onClick={() => navigate("/register/admin")}>
                            Admin of an RSO
                        </Button>
                        <Button style={{width:"70%", marginTop: "10px"}} className="regular" type="button" onClick={() => navigate("/register/superadmin")}>
                            University Admin
                        </Button>
                        <p>Already have an account? <b style={{cursor: "pointer"}} onClick={() => navigate("/login")}> Click here. </b></p>
                </div>
            </Section>
        </div>
    );
}