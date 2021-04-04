import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Title = styled.h4`
    color: ${props => props.open ? "#e3bc30" : "black" };
    &:hover {
        text-decoration: underline;
        text-decoration-color: #e3bc30;
        cursor: pointer;
        color: #e3bc30;
    }
`;

export default function TodaysQuestionHints({ count, item }) {
    // Conditional rendering
    const [clicked, setClicked] = useState(false);
    const render = clicked
        ? (
            <div onClick={() => setClicked(false)}>
                <Title open={clicked}>Hint {(count + 1).toString()}</Title>
                <p>{item}</p>
            </div>
          )
        : (
            <div onClick={() => setClicked(true)}>
                <Title open={clicked}>Hint {(count + 1).toString()}</Title>
            </div>
          );
    return (
        <>
            {render}
        </>
    );
}
