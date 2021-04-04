import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { setOne, getOne } from 'local-js';

// Styling
const Container = styled.div`
    display: flex;
    align-item: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 90%;
`;

const PromptHeader = styled.h4`
    margin-bottom: 3px;
    padding-left: 10px;
    text-decoration: underline;
    text-decoration-color:  #b3b4b5;
`;

const InputWrapper = styled.form`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border: 3px solid #b3b4b5;
    box-shadow: 0px 0px 7px #b3b4b5;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #b3b4b5;
`;

const Textarea = styled.textarea`
    width: 99%; 
    border: transparent;
    resize: none;
    font-size: 16px;
`;

export default function TodaysQuestionNotepad() {
    const [text, setText] = useState('');
    // text handler
    function handleText(e) {
        setText(e.target.value);
    }
    // store text into localStorage
    useEffect(() => {
        if (text === '') { return }

        const key = 'stored-text';
        setOne(key, text);
    }, [text]);

    useEffect(() => {
        const newText = getOne('stored-text');
        setText(newText);
        return function() {
            const newText = getOne('stored-text');
            setText(newText);
        }
    }, []);

    return (
        <Container>
            <PromptHeader>Notepad</PromptHeader>
            <InputWrapper>
                <Textarea placeholder="Write stuff here" rows="30" value={text || ''} onChange={handleText}></Textarea>
            </InputWrapper>
        </Container>
    );
}
