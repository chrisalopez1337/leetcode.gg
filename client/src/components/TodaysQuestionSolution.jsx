import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Prism from "prismjs";

const code = `
const add = (a, b) => a + b
`.trim()
// Styling
const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    min-height: 600px;
`;

const CodeHighlight = styled.span`
    color: #308aff;
    background-color: #d9d9d9;
    border-radius: 3px;
    padding: 1px 5px 1px 5px;
`;

const PromptHeader = styled.h4`
    margin-bottom: 3px;
    text-decoration: underline;
    text-decoration-color:  #b3b4b5;
`;
const PromptContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    width: 90%;
`;
const Prompt = styled.p``;
export default function TodaysQuestionSolution() {
    useEffect(() => Prism.highlightAll());
    return (
        <Container>
            <PromptContainer>
                <PromptHeader>General Idea</PromptHeader>
                <Prompt>
                    This problem is simply solved by writing a function to add the ints <CodeHighlight>a</CodeHighlight> and <CodeHighlight>b</CodeHighlight>
                </Prompt>

                <PromptHeader>Code solution</PromptHeader>
                <pre className="line-numbers">
                <code className="language-js">
                    {code}
                </code>
                </pre>

            </PromptContainer>
        </Container>
    );
}
