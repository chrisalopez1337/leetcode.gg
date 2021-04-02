import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const FormWrapper = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 3px solid #1cd6cd;
    box-shadow: 0px 0px 25px #1cd6cd;
    border-radius: 7px;
    padding: 25px 10px 25px 10px;
    min-width: 400px;
    min-height: 300px;
`;

const FormItemContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    width: 100%;
    flex-direction: column;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
`;

const Input = styled.input`
    border: 1.5px solid #b3b4b5;
    border-radius: 4px;
    padding: 5px;
    background-color: transparent;
    width: 200px;
    font-family: inherit;
    font-size: 20px;
`;

const Label = styled.label`
    font-weight: bold;
    margin-top: 15px;
`;

const SubmitButton = styled.button`
    border: 2px solid #1cd6cd;
    color: #1cd6cd;
    background-color: transparent;
    border-radius: 7px;
    padding: 5px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition-duration: 0.2s;
    &:hover {
        background-color: #1cd6cd;
        color: whitesmoke;
    }
    margin-top: 15px;
`;
export default function LogIn() {
    return (
        <Container>
            <FormWrapper>
                <Form>
                    <h1>Log In</h1>
                    <Label htmlFor="searchItem">Username/Email:</Label>
                    <Input type="text" name="searchItem" />

                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" name="password" />

                    <SubmitButton>Log In</SubmitButton>
                </Form>
            </FormWrapper>
        </Container>
    );
}

