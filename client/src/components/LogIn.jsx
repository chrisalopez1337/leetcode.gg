import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { setOne } from 'local-js';

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
export default function LogIn({ logIn, setPage }) {
     // Set up form data
    const [fields, setFields] = useState({ username: '', password: '' });
    const { username, password } = fields;

    // Set up message data
    const [messages, setMessages] = useState({ errorMessage: '', successMessage: ''});
    const { errorMessage, successMessage } = messages;

    // Handle message update
    function handleMessage(messageType, value) {
        setMessages({...messages, [messageType] : value });
    }

    // Handle input change
    function handleChange(e) {
        const { target } = e;
        const { name, value } = target;
        setFields({...fields, [name]: value });
    }

    // Submit handler form
    function handleSubmit(e) {
        e.preventDefault();
        // Send user data to the validation route.
        if (username === '' || password === '') {
            return handleMessage('errorMessage', 'Please fill out all forms.');
        }
        const userData = { username, password };
        axios.post('/api/users/validate', userData)
            .then(({ data }) => {
                if (data.valid) {
                    const key = 'current-user';
                    setOne(key, data.data.username);
                    logIn(data.data);
                    setPage('dashboard');
                } else {
                    // User is either not found or invalid.
                    handleMessage('errorMessage', 'Please double check your credentials.');
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <Container>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <Label htmlFor="username">Username/Email:</Label>
                    <Input type="text" name="username" value={username} onChange={handleChange} />

                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" name="password" value={password} onChange={handleChange} />

                    <SubmitButton>Log In</SubmitButton>
                    { errorMessage === '' ? null : <p>{errorMessage}</p> }
                </Form>
            </FormWrapper>
        </Container>
    );
}

