import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// Children components
import TestCase from './TestCase.jsx';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    min-height: 550px;
`;

const ResponseWrapper = styled.div`
    display: flex;
    align-items: center; 
    justify-content: flex-start;
    flex-direction: column;
`;

const CodeHighlight = styled.span`
    color: #308aff;
    background-color: #d9d9d9;
    border-radius: 3px;
    padding: 1px 5px 1px 5px;
`;

const PromptHeader = styled.h4`
    margin-bottom: 3px;
`;

const Title = styled.h3`
    color: ${props => props.passed ? "green" : props.failed || props.error ? "red" : null };
`;

const ErrorWrapper = styled.div`
    font-size: 14px;
    margin: 10px;
`;

export default function Eval({ data, allCases }) {
    if (!data) {
        return ( <Container></Container> );
    }
    const { stderr, stdout, equal, output, err, expected } = data;
    const [renderType, setRenderType] = useState(null);
    useEffect(() => {
        if (equal) {
            setRenderType('passed');
        } else if (equal === false && err.err_message === null) {
            setRenderType('failed');
        } else if (err.err_message !== null) {
            setRenderType('error');
        }
    }, [data]);

    const passedRender = 
        (
            <ResponseWrapper>
                <Title passed>You Passed!</Title>
                <PromptHeader>Your Output: <CodeHighlight>{output}</CodeHighlight></PromptHeader>
                <PromptHeader>Expected: <CodeHighlight>{expected}</CodeHighlight></PromptHeader>
            </ResponseWrapper>
        );

    const failedRender =
        (
            <ResponseWrapper>
                <Title failed>You Failed...</Title>
                <PromptHeader>Your Output: <CodeHighlight>{output}</CodeHighlight></PromptHeader>
                <PromptHeader>Expected: <CodeHighlight>{expected}</CodeHighlight></PromptHeader>
            </ResponseWrapper>
        );

    const errorRender = 
        (
            <ResponseWrapper>
                <Title failed>Error...</Title>
                <ErrorWrapper><CodeHighlight>{err.err_stack}</CodeHighlight></ErrorWrapper>
            </ResponseWrapper>
        );

    function generateArray(allCases) {
        let arr = [];
        for (const key in allCases) {
            arr.push({ number: key, expected: allCases[key].expected, output: allCases[key].output });
        }
        return arr;
    }

    const render = renderType == 'passed'
        ? passedRender
        : renderType == 'failed'
        ? failedRender
        : renderType === 'error'
        ? errorRender
        : <h3></h3>;
    return (
        <Container>
            {render}
            { generateArray(allCases).map(({ number, expected, output }) => <TestCase expected={expected} output={output} number={number}/>)}
        </Container>
    );
}
