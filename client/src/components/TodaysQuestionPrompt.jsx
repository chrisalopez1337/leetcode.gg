import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styling
const TitleRow = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    border-top: 0.5px solid  #1cd6cd;
`;

const Title = styled.h4`
    margin-left: 10px;
`;

const TitleDifficulty = styled.h5`
    color: white;
    background-color: ${props => props.difficulty === 'easy' ? "#2bcc53" : "white" };
    padding: 2px 4px 2px 4px;
    border-radius: 3px;
    margin-left: 10px;
`;

export default function TodaysQuestionPrompt() {
    return (
        <TitleRow>
            <Title>1. Add two numbers</Title>
            <TitleDifficulty difficulty="easy">easy</TitleDifficulty>
        </TitleRow>
    );
}
