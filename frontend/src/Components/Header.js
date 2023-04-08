import "./Header.css"
import {Button} from "react-bootstrap"
import NavigationButton from '../Components/NavigationButton';
import {useNavigate} from "react-router-dom";

export default function Header({setUser, type}) {

    let navigate = useNavigate();
    
    switch (type){
        case "Student":
        {
            return (
                <div className="white lowershadow" style={{height: "60px", display: "flex", alignItems: "center", justifyContent:"space-between", paddingInline:"100px"}}>
                    <button className="homebutton" style={{ display: "flex", height:"100%", alignItems: "center"}} onClick={() => {navigate("/")}}>
                        <h3 style={{maxHeight:"50px", minWidth:"50px", margin: "10px"}}>Event Planner</h3>
                    </button>
                    <div style={{ display: "flex", height:"100%"}}>
                        <div style={{ display: "flex", height:"100%", marginRight: "30px"}}>
                            <NavigationButton className="white" urlTag="/RSO">My RSOs</NavigationButton>
                        </div>
                    </div>
                    <div style={{ display: "flex", height:"100%", alignItems: "center"}}>
                        <Button className="white" type="button" onClick={() => {navigate("/"); setUser(undefined)}}>
                            <p>Sign Out</p>
                        </Button>
                    </div>
                </div>
            );
        }
        case "RSO Admin":
        {
            return (
                <div className="white lowershadow" style={{height: "60px", display: "flex", alignItems: "center", justifyContent:"space-between", paddingInline:"100px"}}>
                    <button className="homebutton" style={{ display: "flex", height:"100%", alignItems: "center"}} onClick={() => {navigate("/")}}>
                        <h3 style={{maxHeight:"50px", minWidth:"50px", margin: "10px"}}>Event Planner</h3>
                    </button>
                    <div style={{ display: "flex", height:"100%"}}>
                        <div style={{ display: "flex", height:"100%", marginRight: "30px"}}>
                            <NavigationButton className="white" urlTag="/RSO">My RSOs</NavigationButton>
                        </div>
                    </div>
                    <div style={{ display: "flex", height:"100%", alignItems: "center"}}>
                        <Button className="white" type="button" onClick={() => {navigate("/"); setUser(undefined)}}>
                            <p>Sign Out</p>
                        </Button>
                    </div>
                </div>
            );
        }
        case "Super Admin":
        {
            return (
                <div className="white lowershadow" style={{height: "60px", display: "flex", alignItems: "center", justifyContent:"space-between", paddingInline:"100px"}}>
                    <button className="homebutton" style={{ display: "flex", height:"100%", alignItems: "center"}} onClick={() => {navigate("/")}}>
                        <h3 style={{maxHeight:"50px", minWidth:"50px", margin: "10px"}}>Event Planner</h3>
                    </button>
                    <div style={{ display: "flex", height:"100%"}}>
                        <div style={{ display: "flex", height:"100%", marginRight: "30px"}}>
                            <NavigationButton className="white" urlTag="error">University Profile</NavigationButton>
                        </div>
                    </div>
                    <div style={{ display: "flex", height:"100%", alignItems: "center"}}>
                        <Button className="white" type="button" onClick={() => {navigate("/"); setUser(undefined)}}>
                            <p>Sign Out</p>
                        </Button>
                    </div>
                </div>
            );
        }
        default:
        {
            return (
                <div className="white lowershadow" style={{height: "60px", display: "flex", alignItems: "center", justifyContent:"space-between", paddingInline:"100px"}}>
                    <button className="homebutton" style={{ display: "flex", height:"100%", alignItems: "center"}}>
                        <h3 style={{maxHeight:"50px", minWidth:"50px", margin: "10px"}}>Event Planner</h3>
                    </button>
                </div>
            );
        }
    }
    
}