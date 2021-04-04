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

export default function HeaderButtons({ setPage, userData, logOut }) {
    // Conditionally render depending if the user is logged in or not.
    const loggedOut = (
                        <>
                        <NavItem onClick={() => setPage('sign-up')}>Sign Up</NavItem>
                        <NavItem onClick={() => setPage('log-in')}>Log In </NavItem>
                        </>
                      );

    const loggedIn = (
                        <>
                        <NavItem onClick={() => logOut()}>Log Out</NavItem>
                        <NavItem onClick={() => setPage('dashboard')}>Dashboard</NavItem>
                        </>
                     );
    const render = userData
        ? loggedIn
        : loggedOut;
    return (
        <Container key={userData}>
            {render}
        </Container>
    )
}
