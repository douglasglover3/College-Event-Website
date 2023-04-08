import Login from './Pages/Login';
import Register from './Pages/Register';
import Error from './Pages/Error';

import UserRSOs from './Pages/UserRSOs';
import RSOPage from './Pages/RSOPage';
import CreateRso from './Pages/CreateRso';

import Header from './Components/Header';

import {useState, StrictMode} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";



export default function App() {
    //logged in users data
    const [user, setUser] = useState();

    // if logged in
    if(user)
    {
        if(user.type === "Student" || user.type === "RSO Admin")
            return (
                <StrictMode>
                    <Router>
                        <Header setUser={setUser} type={user.type}/>
                        <Routes>
                            <Route path="/" element={<Error errorType="Successful Login as Student."/>}/>
                            <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                            <Route path="/RSO" element={<UserRSOs user={user}/>}/>
                            <Route path="/newRSO" element={<CreateRso user={user}/>}/>
                            <Route path="/RSO/*" element={<RSOPage/>}/>
                            <Route path="*" element={<Navigate to='/'/>}/>
                        </Routes>
                    </Router>
                </StrictMode>
            );
        else if(user.type === "Super Admin")
            return (
                <StrictMode>
                    <Router>
                        <Header setUser={setUser} type={user.type}/>
                        <Routes>
                            <Route path="/" element={<Error errorType="Successful Login as Super Admin."/>}/>
                            <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                            <Route path="*" element={<Error errorType="Page does not exist."/>}/>
                        </Routes>
                    </Router>
                </StrictMode>
            );
        else
            return (
                <StrictMode>
                    <Router>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
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