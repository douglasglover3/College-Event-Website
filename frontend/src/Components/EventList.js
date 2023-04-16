import {SectionHeader} from '../Components/Section';
import NavigationButton from '../Components/NavigationButton';

export default function EventList ({events}) {
    return (
        <div style={{width:"100%"}}>
            {events.map((event) => 
                <div key={event.eventName}>
                    <SectionHeader color="white">
                        <div style={{width:"30%", justifyContent:"end"}}>
                            <h5>{event.eventName}</h5> 
                            <h6>{event.sponsor}</h6>
                        </div>
                        <div style={{width:"30%", justifyContent:"end"}}>
                            <h6 style={{alignSelf:"end"}}>{event.eventTime}</h6>
                            <h6 style={{alignSelf:"end"}}>{event.eventDate}</h6> 
                        </div>
                        <NavigationButton className="dark" urlTag={"/Event/" + event.eventName} extraData={{ event: event}}>View Event</NavigationButton>
                    </SectionHeader>
                    <SectionHeader color="light"></SectionHeader>
                </div>
            )}
        </div>
    );
}