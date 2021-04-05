import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// Children components
import TodaysQuestionHints from './TodaysQuestionHints.jsx';

// Styling
const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;


const TitleRow = styled.div`
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
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

const CodeHighlight = styled.span`
    color: #308aff;
    background-color: #d9d9d9;
    border-radius: 3px;
    padding: 1px 5px 1px 5px;
`;

const PromptContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    width: 90%;
`;

const Prompt = styled.p``;

const PromptHeader = styled.h4`
    margin-bottom: 3px;
    text-decoration: underline;
    text-decoration-color:  #b3b4b5;
`;

const SampleInputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 10px;
`;




export default function TodaysQuestionPrompt() {
    // Sample for rending
    const hints = ['This is an easy question, the formula is a + b = c'];
    return (
        <Container>
            <TitleRow>
                <Title>1. Add two numbers</Title>
                <TitleDifficulty difficulty="easy">easy</TitleDifficulty>
            </TitleRow>

            <PromptContainer>
                <PromptHeader>Description</PromptHeader>
                <Prompt>
                    Given two numbers <CodeHighlight>a</CodeHighlight> and <CodeHighlight>b</CodeHighlight> write a function that will return <CodeHighlight>a + b</CodeHighlight>.  
                </Prompt>
            
                <PromptHeader>Example Input</PromptHeader>
                
                <SampleInputWrapper>
                    <CodeHighlight>
                        a = 1, b = 2 
                    </CodeHighlight>
                </SampleInputWrapper>

                <PromptHeader>Example Output</PromptHeader>
                <SampleInputWrapper>
                    <CodeHighlight>
                        addTwo(a, b) --> 3
                    </CodeHighlight>
                </SampleInputWrapper>


                <PromptHeader>Constraints</PromptHeader>
                <ul>
                    <li><CodeHighlight>N/A</CodeHighlight></li>
                </ul>

                <PromptHeader>Hints</PromptHeader>
                { hints.map((item, i) => <TodaysQuestionHints item={item} key={i} count={i} />)}
            </PromptContainer>
        </Container>
    );
}
