import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function NavigationButton({ children, urlTag, extraData, className, style })
{
    var data = extraData || null;
    let navigate = useNavigate();
    return (
        <Button className={className} style={style} type="button" onClick={() => {navigate(urlTag, {state: data})}}>
            {children}
        </Button>
    );
}