import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
// Children components
import Header from './Header.jsx';
import LandingDisplay from './LandingDisplay.jsx';
import SignUp from './SignUp.jsx';


// Styling
const Container = styled.div`
    display: flex;
    align-items; center;
    flex-direction: column;
`;

export default function App() {
    const [page, setPage] = useState('landing');
    // Conditional rendering
    const pageRender = page === 'landing'
        ? <LandingDisplay setPage={setPage} />
        : page === 'sign-up'
        ? <SignUp setPage={setPage} />
        : <></>
    return (
        <Container>
            <Header setPage={setPage} />
            {pageRender}
        </Container>
    );
}
