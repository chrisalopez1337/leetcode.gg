import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    border: 3px solid #1cd6cd;
    box-shadow: 0px 0px 25px #1cd6cd;
    border-radius: 7px;
`;

const QuestionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    min-width: 500px;
`;

const QuestionNavBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    flex-direction: row;
    padding-left: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
`;

const QuestionNavButton = styled.button`
    background-color: ${props => props.selected ? "#e3bc30" : "whitesmoke" };
    border: transparent;
    border-radius: 4px;
    margin: 3px;
    color: ${props => props.selected ? "white" : "black" };
    padding: 10px;
    font-family: inherit;
    font-size: 16px;
    transition-duration: 0.2s;
    &:hover {
        background-color: #1cd6cd;
        color: white;
    }
`;

export default function TodaysQuestion() {
    const [render, setRender] = useState('prompt');
    function buttonHandler(e) {
        const name = e.target.name;
        setRender(name);
    }
    return (
        <Container>
            <h1>Todays Question</h1>
            <ContentWrapper>
                <QuestionWrapper>
                    <QuestionNavBar>
                        <QuestionNavButton selected={render === 'prompt' ? true : false} name="prompt" onClick={(e) => buttonHandler(e)}>Prompt</QuestionNavButton>       
                        <QuestionNavButton selected={render === 'notepad' ? true : false} name="notepad" onClick={(e) => buttonHandler(e)}>Notepad</QuestionNavButton>       
                    </QuestionNavBar>
                </QuestionWrapper>
            </ContentWrapper>
        </Container>
    );
}