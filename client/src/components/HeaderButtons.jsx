import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items; center;
    justify-content: center;
    flex-direction: row;
`;

const NavItem = styled.h3`
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-decoration-color: #b3b4b5;
    margin-right: 7px;
    margin-left: 7px;
    transition-duration: 0.2s;
    cursor: pointer;
    &:hover {
        text-decoration-color: #1cd6cd;
        color: #1cd6cd;
    }
`;

export default function HeaderButtons({ setPage }) {
    return (
        <Container>
            <NavItem onClick={() => setPage('sign-up')}>Sign Up</NavItem>
            <NavItem>Log In </NavItem>
        </Container>
    )
}
