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
`;

export default function Header() {
    return (
        <Container>
            <Logo>Leetcode.gg | </Logo>
            <HeaderButtons />
        </Container>
    );
}
