import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styling
const Container = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
    flex-direction: column;
`;

const BoxRow = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
`;

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content:
    flex-direction: column;
    border: 3px solid #b3b4b5;
    box-shadow: 0px 0px 10px #b3b4b5;
    cursor: pointer;
    transition-duration: 0.2s;
    border-radius: 7px;
    padding: 25px 10px 25px 10px;
    min-width: 300px;
    min-height: 250px;
    margin: 20px;
    &:hover {
        border: 3px solid #1cd6cd;
        box-shadow: 0px 0px 25px #1cd6cd;
    }
`;

export default function Dashboard({ setPage, userData }) {
    return (
        <Container>
            <h1>Dashboard</h1>

            <BoxRow>
                <Box></Box>
                <Box></Box>
            </BoxRow>

            <BoxRow>
                <Box></Box>
                <Box></Box>
            </BoxRow>
        </Container>
    );
}
