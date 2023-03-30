import Login from './Pages/Login';
import Register from './Pages/Register';
import RegisterStudent from './Pages/RegisterStudent';
import RegisterAdmin from './Pages/RegisterAdmin';
import RegisterSuperAdmin from './Pages/RegisterSuperAdmin';
import Error from './Pages/Error';

import Header from './Components/Header';

import Axios from "axios"
import { API_URL } from './info';

import {useState, useEffect, StrictMode} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";



export default function App() {
    //logged in users data
    const [user, setUser] = useState();

    // if logged in
    if(user)
    {
        return (
            <StrictMode>
                <Router>
                    <Routes>
                        <Route path="/" element={<Error errorType="Successful Login."/>}/>
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
                    <Route path="/register/student" element={<RegisterStudent setUser={setUser}/>}/>
                    <Route path="/register/admin" element={<RegisterAdmin setUser={setUser}/>}/>
                    <Route path="/register/superadmin" element={<RegisterSuperAdmin setUser={setUser}/>}/>
                    <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                    <Route path="*" element={<Error errorType="Page does not exist."/>}/>
                </Routes>
            </Router>
        </StrictMode>
    );
}