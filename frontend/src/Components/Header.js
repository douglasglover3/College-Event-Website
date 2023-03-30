import "./Header.css"

export default function Header() {
    return (
        <div className="white lowershadow" style={{height: "60px", display: "flex", alignItems: "center", justifyContent:"space-between", paddingInline:"100px"}}>
            <button className="homebutton" style={{ display: "flex", height:"100%", alignItems: "center"}}>
                <h3 style={{maxHeight:"50px", minWidth:"50px", margin: "10px"}}>Event Planner</h3>
            </button>
        </div>
    );
}