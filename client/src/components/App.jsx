import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
// Children components
import Header from './Header.jsx';
import LandingDisplay from './LandingDisplay.jsx';

// Styling
const Container = styled.div`
    display: flex;
    align-items; center;
    flex-direction: column;
`;

export default function App() {
    return (
        <Container>
            <Header />
            <LandingDisplay />
        </Container>
    );
}
