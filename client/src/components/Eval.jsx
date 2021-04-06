import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Eval({ data }) {
    const { error, stdout, stderr } = data;

    const goodRender = 
        (   
            <>
                <h1>You Passed!</h1>
                <p>Your output: {stdout ? stdout.split('\n')[0] : null}</p>
            </>
            
        );

    const badRender = 
        (
            <>
                <h1>You Failed</h1>
                <p>Expected: 3</p>
                <p>Received: undefined</p>
                <p>{error ? error.message : null}</p>
            </>
        )

    const render = error?.message
        ? badRender
        : goodRender;

    return (
        <>
            {render}
        </>
    );
}
