import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Utils
import { setOne, getOne, deleteOne } from 'local-js';
// Children components
import Header from './Header.jsx';
import LandingDisplay from './LandingDisplay.jsx';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';
import Dashboard from './Dashboard.jsx';



// Styling
const Container = styled.div`
    display: flex;
    align-items; center;
    flex-direction: column;
`;

export default function App() {
    // User management
    const [userData, setUserData] = useState(null);

    function logIn(data) {
        setUserData(data);
        const key = 'current-user';
        setOne(key, data.username);
        setPage('dashboard');
    }

    function logOut() {
        setUserData(null);
        const key = 'current-user';
        deleteOne(key);
        setPage('landing');
    }

    useEffect(() => {
        const key = 'current-user';
        const data = getOne(key);
        if (data) {
            axios.get(`/api/users/get/${data}`)
                .then(({ data }) => {
                    setUserData(data);
                    setPage('dashboard');
                })
                .catch(console.log);
        } else {
            setUserData(null);
            setPage('landing');
        }
    }, []);

    // Conditional rendering
    const [page, setPage] = useState(null);
    const pageRender = page === 'landing'
        ? <LandingDisplay setPage={setPage} />
        : page === 'sign-up'
        ? <SignUp setPage={setPage} />
        : page === 'log-in'
        ? <LogIn setPage={setPage} logIn={logIn} />
        : page === 'dashboard'
        ? <Dashboard setPage={setPage} />
        : <></>
    return (
        <Container>
            <Header setPage={setPage} userData={userData} logOut={logOut} />
            {pageRender}
        </Container>
    );
}
