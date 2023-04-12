import Login from './Pages/Login';
import Register from './Pages/Register';
import Error from './Pages/Error';

import HomePage from './Pages/HomePage';

import UserRSOs from './Pages/UserRSOs';
import RSOPage from './Pages/RSOPage';
import CreateRso from './Pages/CreateRso';

import EventPage from './Pages/EventPage';
import CreateEvent from './Pages/CreateEvent';

import UniversityPage from './Pages/UniversityPage'
import UnauthorizedEvents from './Pages/UnauthorizedEvents';

import Header from './Components/Header';

import {useState, StrictMode} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";



export default function App() {
    //logged in users data
    const [user, setUser] = useState(undefined);
    //{userID: "Doug2", universityName:"University Of Central Florida", type: "Super Admin"}
    // if logged in
    if(user)
    {
        return (
            <StrictMode>
                <Router>
                    <Header setUser={setUser} type={user.type}/>
                    <Routes>
                        <Route path="/" element={<HomePage user={user}/>}/>
                        <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                        <Route path="/RSO" element={<UserRSOs user={user}/>}/>
                        <Route path="/newRSO" element={<CreateRso user={user}/>}/>
                        <Route path="/Event/*" element={<EventPage user={user}/>}/>
                        <Route path="/newEvent/*" element={<CreateEvent user={user}/>}/>
                        <Route path="/RSO/*" element={<RSOPage user={user}/>}/>
                        <Route path="/University" element={<UniversityPage user={user}/>}/>
                        <Route path="/approveEvents" element={<UnauthorizedEvents user={user}/>}/>
                        <Route path="*" element={<Navigate to='/'/>}/>
                    </Routes>
                </Router>
            </StrictMode>
        );
    }
    // if not logged in
    return (
        <StrictMode>
            <Router>
                <Header type={"None"}/>
                <Routes>
                    <Route path="/" element={<Navigate to='/login'/>}/>
                    <Route path="/login" element={<Login setUser={setUser}/>}/>
                    <Route path="/register" element={<Register setUser={setUser}/>}/>
                    <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                    <Route path="*" element={<Navigate to='/login'/>}/>
                </Routes>
            </Router>
        </StrictMode>
    );
}