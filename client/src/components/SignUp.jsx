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
export default function SignUp() {
    // Form data state
    const [fields, setFields] = useState({ username: '', email: '', password: '', pwdVerify: ''});
    const { username, email, password, pwdVerify } = fields;
    // Form data handler
    function handleForm(e) {
        const target = { e };
        const { name, value } = target;
        setFields({ ...fields, [name]: value });
    }


    // Messaging state
    const [messages, setMessages] = useState({ 
                                                usernameMsg: { text: '', error: 'empty' }, 
                                                emailMsg: { text: '', error: 'empty' },
                                                passwordMsg: { text: '', error: 'empty' },
                                                pwdVerifyMsg: { text: '', error: 'empty' },
                                            });
    const { usernameMsg, emailMsg, passwordMsg, pwdVerifyMsg } = messages;
    // Message handler
    function handleMessage(type, text, error) {
        const newObj = { text, error };
        setMessages({ ...messages, [type]: newObj });
    }

    // Username field validation
    useEffect(() => {
        if (username === '') { 
            setMessages(usernameMsg, '', 'empty'); 
        } else {
            const regex = new RegExp("^[a-zA-Z0-9]{4,10}$");
            if (regex.test(username)) {
                // Make sure the username is not already in use
            }
        }
    }, [username]);

    return (
        <Container>
            <FormWrapper>
                <Form>
                    <h1>Sign Up</h1>
                    <Label htmlFor="username">Username:</Label>
                    <Input type="text" name="username" value={username} onChange={handleForm} />

                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" name="email" value={email} onChange={handleForm} />

                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" name="password" value={password} onChange={handleForm} />

                    <Label htmlFor="pwdVerify">Verify your password:</Label>
                    <Input type="password" name="pwdVerify" value={pwdVerify} onChange={handleForm} />

                    <SubmitButton>Sign Up</SubmitButton>
                </Form>
            </FormWrapper>
        </Container>
    );
}
