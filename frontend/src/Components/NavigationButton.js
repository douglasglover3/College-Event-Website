import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function NavigationButton({ children, urlTag, extraData, className })
{
    var data = extraData || null;
    let navigate = useNavigate();
    return (
        <Button className={className} type="button" onClick={() => {navigate(urlTag, {state: data})}}>
            {children}
        </Button>
    );
}