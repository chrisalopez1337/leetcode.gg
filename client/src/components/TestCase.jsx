import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;

const Title = styled.h3`
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

export default function TestCase({ expected, output }) {
    console.log(expected, output)
    const [open, setOpen] = useState(false);

    const openHint = 
        (
            <>
                <h4>Expected: {expected}</h4>
                <h4>Recieved: {output}</h4>
            </>
        );

    const openRender = open
        ? openHint
        : <></>;
    return (
        <>
            <Title onClick={() => setOpen(!open)}>Test Case #1</Title>
            {openRender}
        </>
    );
}
