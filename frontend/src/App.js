import Login from './Pages/Login';
import Register from './Pages/Register';
import Error from './Pages/Error';

import Header from './Components/Header';

import {useState, useEffect, StrictMode} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";



export default function App() {
    //logged in users data
    const [user, setUser] = useState();

    // if logged in
    if(user)
    {
        if(user.type === "Student")
            return (
                <StrictMode>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Error errorType="Successful Login as Student."/>}/>
                            <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                            <Route path="*" element={<Navigate to='/'/>}/>
                        </Routes>
                    </Router>
                </StrictMode>
            );
        else if(user.type === "RSO Admin")
            return (
                <StrictMode>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Error errorType="Successful Login as RSO Admin."/>}/>
                            <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                            <Route path="*" element={<Navigate to='/'/>}/>
                        </Routes>
                    </Router>
                </StrictMode>
            );
        else if(user.type === "Super Admin")
            return (
                <StrictMode>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Error errorType="Successful Login as Super Admin."/>}/>
                            <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                            <Route path="*" element={<Error errorType="Page does not exist."/>}/>
                        </Routes>
                    </Router>
                </StrictMode>
            );
    }
    // if not logged in
    return (
        <StrictMode>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to='/login'/>}/>
                    <Route path="/login" element={<Login setUser={setUser}/>}/>
                    <Route path="/register" element={<Register setUser={setUser}/>}/>
                    <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                    <Route path="*" element={<Error errorType="Page does not exist."/>}/>
                </Routes>
            </Router>
        </StrictMode>
    );
}