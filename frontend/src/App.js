import Login from './Pages/Login';
import AccountType from './Pages/AccountType';
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
                    <Route path="/register" element={<AccountType setUser={setUser}/>}/>
                    <Route path="/register/student" element={<Register setUser={setUser} type={"Student"}/>}/>
                    <Route path="/register/admin" element={<Register setUser={setUser} type={"RSO Admin"}/>}/>
                    <Route path="/register/superadmin" element={<Register setUser={setUser} type={"Super Admin"}/>}/>
                    <Route path="/error" element={<Error errorType="Something went wrong. Our servers might be down. Please try again later."/>}/>
                    <Route path="*" element={<Error errorType="Page does not exist."/>}/>
                </Routes>
            </Router>
        </StrictMode>
    );
}