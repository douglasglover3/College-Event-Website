import {Section} from '../Components/Section';

export default function Error({errorType}) {
    return (
       <Section color="white"><p>Error: {errorType}</p></Section>
    );
}