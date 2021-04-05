import React, { useState, useEffect } from 'react';
import { getOne, setOne } from 'local-js';
import styled from 'styled-components';
import Prism from 'prismjs';
import {Controlled as CodeMirror} from 'react-codemirror2';
import { Resizable } from 're-resizable';
// The following two imports is for the theme.
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
// This import is for the language syntax highlighting.
import 'codemirror/mode/javascript/javascript.js';


const baseCode = `
function addTwo(a, b) {
    // Your code here...
}
`.trim()

export default function IDE() {
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

    return (
        <Resizable
            defaultSize={{
                width: 700,
                height: 600
            }}
        >
            <CodeMirror
                className="CodeMirror"
                value={code || baseCode}
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
    );
};
