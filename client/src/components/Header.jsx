import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
// Children components
import HeaderButtons from './HeaderButtons.jsx';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`;

const Logo = styled.h1`
    margin-left: 10px;
    transition-duration: 0.2s;
    &:hover {
        color: #1cd6cd;
        cursor: pointer;
    }
`;

export default function Header({ setPage, userData, logOut }) {
    return (
        <Container>
            <Logo onClick={() => setPage(userData ? 'dashboard' : 'landing')}>Leetcode.gg | </Logo>
            <HeaderButtons setPage={setPage} userData={userData} logOut={logOut} />
        </Container>
    );
}
