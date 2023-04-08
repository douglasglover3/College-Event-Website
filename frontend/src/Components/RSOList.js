import {SectionHeader} from '../Components/Section';
import NavigationButton from '../Components/NavigationButton';

export function RSOList ({rsos, footer}) {
    return (
        <ul>
            {rsos.map((rso) => 
                <li key={rso.rsoName}>
                    <SectionHeader color="white"><h5>{rso.rsoName}</h5>
                        <NavigationButton urlTag={"/RSO/" + rso.rsoName} extraData={{ rso: rso}}>View Events</NavigationButton>
                    </SectionHeader>
                    <SectionHeader color="light"></SectionHeader>
                </li>
            )}
            {footer}
        </ul>
    );
}