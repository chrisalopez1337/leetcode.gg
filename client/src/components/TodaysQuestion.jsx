import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children components
import TodaysQuestionPrompt from './TodaysQuestionPrompt.jsx';
import TodaysQuestionNotepad from './TodaysQuestionNotepad.jsx';
import TodaysQuestionSolution from './TodaysQuestionSolution.jsx';
import IDE from './IDE.jsx';
import Eval from './Eval.jsx';

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
    box-shadow: 0px 0px 5px #1cd6cd;
    border-radius: 7px;
    min-height: 650px;
`;

const QuestionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    min-width: 600px;
    max-width: 600px;
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

const CodeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    min-width: 700px;
    max-width: 700px;
    padding-right: 10px;
    height: 600px;
`;
export default function TodaysQuestion() {
    // Code handler
    const [evaledCode, setEvaledCode] = useState(null);
    useEffect(() => {
        if (evaledCode) {
            setRender('eval');
        }
    }, [evaledCode])
    // Button handlers
    const [render, setRender] = useState('prompt');
    function buttonHandler(e) {
        const name = e.target.name;
        setRender(name);
    }
    // Conditional rendering
    const itemRender = render === 'prompt'
        ? <TodaysQuestionPrompt />
        : render === 'notepad'
        ? <TodaysQuestionNotepad />
        : render === 'solution'
        ? <TodaysQuestionSolution />
        : render === 'eval'
        ? <Eval data={evaledCode['1']} allCases={evaledCode} />
        : <></>;
    return (
        <Container>
            <h1>Todays Question</h1>
            <ContentWrapper>
                <QuestionWrapper>
                    <QuestionNavBar>
                        <QuestionNavButton selected={render === 'prompt' ? true : false} name="prompt" onClick={(e) => buttonHandler(e)}>Prompt</QuestionNavButton>       
                        <QuestionNavButton selected={render === 'notepad' ? true : false} name="notepad" onClick={(e) => buttonHandler(e)}>Notepad</QuestionNavButton>       
                        <QuestionNavButton selected={render === 'solution' ? true : false} name="solution" onClick={(e) => buttonHandler(e)}>Solution</QuestionNavButton>       
                        <QuestionNavButton selected={render === 'eval' ? true : false} name="eval" onClick={(e) => buttonHandler(e)}>Output</QuestionNavButton>
                    </QuestionNavBar>
                    {itemRender}
                </QuestionWrapper>
                
                <CodeWrapper>
                    <IDE setEvaledCode={setEvaledCode} />
                </CodeWrapper>
            </ContentWrapper>
        </Container>
    );
}
