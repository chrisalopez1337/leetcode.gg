import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
// Utils
import { setOne, getOne, deleteOne } from 'local-js';
// Children components
import Header from './Header.jsx';
import LandingDisplay from './LandingDisplay.jsx';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';



// Styling
const Container = styled.div`
    display: flex;
    align-items; center;
    flex-direction: column;
`;

export default function App() {
    // User management
    const [userData, setUserData] = useState(null);
    // GET users data
    function fetchAndUpdateUser(username) {
        // Retrieve user data
        axios.get(`/api/users/get/${username}`).
            then(({ data }) => {
                if (!data?.username) {
                    setUserData(null);
                } else {
                    setUserData(data);
                }
            })
            .catch(console.log);
    }

    // Persist username in local storage.
    function logIn(username) {
        // Set item to local storage
        const key = 'current-user';
        setOne(key, username);
        // Mount user data
        fetchAndUpdateUser(username);
    }

    // Log a user out
    function logOut() {
        // Remove user from local stroage
        const key = 'current-user';
        deleteOne(key);
        // Remove there user data from state
        setUserData(null);
    }

    


    // Conditional rendering
    const [page, setPage] = useState('landing');
    const pageRender = page === 'landing'
        ? <LandingDisplay setPage={setPage} />
        : page === 'sign-up'
        ? <SignUp setPage={setPage} />
        : page === 'log-in'
        ? <LogIn setPage={setPage} />
        : <></>
    return (
        <Container>
            <Header setPage={setPage} />
            {pageRender}
        </Container>
    );
}
