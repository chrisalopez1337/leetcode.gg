import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default function SignUp() {
    return (
        <Container>
            <h1>Sign Up</h1>
        </Container>
    );
}
