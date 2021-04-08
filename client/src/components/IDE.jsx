import React, { useState, useEffect } from 'react';
import { getOne, setOne } from 'local-js';
import axios from 'axios';
import styled from 'styled-components';
import Prism from 'prismjs';
import {Controlled as CodeMirror} from 'react-codemirror2';
import { Resizable } from 're-resizable';
// The following two imports is for the theme.
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
// This import is for the language syntax highlighting.
import 'codemirror/mode/javascript/javascript.js';


let baseCode = `
function addTwo(a, b) {
    return a + b;
}
`.trim();

// Styling
const ButtonRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 10px;
`;

const Button = styled.button`
 background-color: #e3bc30;
    border: transparent;
    border-radius: 4px;
    color: white;
    margin-left: 3px;
    margin-right: 3px;
    padding: 7px;
    font-family: inherit;
    font-size: 14px;
    transition-duration: 0.2s;
    &:hover {
        background-color: #1cd6cd;
        color: white;
    }
`;

export default function IDE({ setEvaledCode }) {
    const [code, setCode] = useState(baseCode);
    function handleChange(e) {
        setCode(e.target.value);
    }

    // Store code in local storage
    useEffect(() => {
        if (code === baseCode) { return }

        const key = 'stored-code';
        setOne(key, code);
    }, [code]);

    useEffect(() => {
        const newCode = getOne('stored-code');
        setCode(newCode);
        return function() {
            const newCode = getOne('stored-code');
            setCode(newCode);
        }
    }, [])

    function handleRunCode() {
        const allTests =
            [
                {
                    case: 'addTwo(1,2)',
                    expected: 3,
                },
                {
                    case: 'addTwo(56, 44)',
                    expected: 100,
                },
            ];
        const data = { code, language: 'javascript', allTests };
        axios.post('/api/js/eval-all', data)
            .then(({ data }) => {
                setEvaledCode(data);
            })
            .catch(console.log);
    }

    return (
        <>
            <ButtonRow>
                <Button onClick={() => handleRunCode()}>Run Code</Button>
                <Button>Submit Code</Button>
            </ButtonRow>
            <Resizable
                defaultSize={{
                    width: 700,
                    height: 550
                }}
            >
                <CodeMirror
                    className="CodeMirror"
                    value={!code ? '' : code}
                    options={{
                        lineNumbers: true,
                        mode: 'javascript',
                        theme: 'material',
                    }}
                    onBeforeChange={(editor, data, value) => {
                        setCode(value)
                    }}
                    onChange={(editor, data, value) => {
                        setCode(value)
                    }}
                />
            </Resizable>
        </>
    );
};
