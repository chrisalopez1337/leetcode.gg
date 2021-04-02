import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
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
    const [page, setPage] = useState('home');
    // Conditional rendering
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
