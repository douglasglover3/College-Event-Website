import {SectionHeader} from '../Components/Section';
import {useLocation} from "react-router-dom";

export default function RSOPage() {
    const rso = useLocation().state.rso
    return (
       <SectionHeader color="light"><h3>{rso.name}</h3></SectionHeader>
    );
}