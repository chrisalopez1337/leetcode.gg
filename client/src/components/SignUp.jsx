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

const Message = styled.div`
    max-width: 400px;
    margin-left: 15px;
`;
export default function SignUp() {
         // Store form data;
    const [fields, setFields] = useState({ username: '', password: '', verifyPassword: '', email: '' });
    const { username, password, verifyPassword, email } = fields;

    // Store user messaging
    const [messages, setMessages] = useState({ submitMessage: '', usernameMessage: '', passwordMessage: '', verifyPasswordMessage: '', emailMessage: ''});
    const { usernameMessage, passwordMessage, verifyPasswordMessage, emailMessage, submitMessage } = messages;

    // Update handlers
    function handleChange(e) {
        const { target } = e;
        const { value, name } = target;
        setFields({...fields, [name]: value});
    }

    function handleMessage(name, value) {
        setMessages({...messages, [name]: value});
    }
    // Form validation for username: 4-10 Chars no special.
    useEffect(() => {
        if (username === '') {
            handleMessage('usernameMessage', '');
        } else {
            const regex = new RegExp("^[a-zA-Z0-9]{4,10}$");
            if (regex.test(username)) {
                // Make sure username doesnt already exist.
                axios.get(`/api/users/get/${username}`)
                    .then(({ data }) => {
                        if (!data.username) {
                            // Username is available.
                            handleMessage('usernameMessage', '');
                        } else {
                            // Username is taken;
                            const message = 'Username is already taken';
                            handleMessage('usernameMessage', message);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                const message = 'Username must be 4-10 characters, and contain no special characters.';
                handleMessage('usernameMessage', message)
            }
        }
    }, [username]);

    // Form validation for password
    useEffect(() => {
        if (password === '') {
            handleMessage('passwordMessage', '');
        } else {
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
            if (regex.test(password)) {
                handleMessage('passwordMessage', '');
            } else {
                handleMessage('passwordMessage', 'Password must be eight or more characters, contain atleast one uppercase, one symbol, and one lowercase.');
            }
        }
    }, [password]);

    // Form validation for password verification
    useEffect(() => {
        if (verifyPassword === '' && password === '') {
            handleMessage('verifyPasswordMessage', '');
        } else if (verifyPassword === password) {
            handleMessage('verifyPasswordMessage', '');
        } else {
            handleMessage('verifyPasswordMessage', 'Passwords must match');
        }
    }, [verifyPassword]);


    // Form validation for email
    useEffect(() => {
        if (email === '') {
            handleMessage('emailMessage', '');
        } else {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (regex.test(email.toLowerCase())) {
                // First make sure the email hasnt already been registered.
                axios.get(`/api/users/get/${email}`)
                    .then(({ data }) => {
                        if (!data.email) {
                            // This means the email hasnt been taken.
                            handleMessage('emailMessage', '');
                        } else {
                            // The email is already registered.
                            const message = 'This email is already registered';
                            handleMessage('emailMessage', message);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                handleMessage('emailMessage', 'Please enter a valid email.');
            }
        }
    }, [email]);


    // Submit handler
    function handleSubmit(e) {
        e.preventDefault();

        let valid = true; 

        const requiredFields = [username, email, password, verifyPassword];
        const errorMessages = [usernameMessage, emailMessage, passwordMessage, verifyPasswordMessage];
        const fieldError = 'All fields must be filled out.';
        const formatError = 'Please make sure all fields are formatted correctly.';

        for (let i = 0; i < requiredFields.length; i++) {
            const fieldItem = requiredFields[i];
            const formatItem = errorMessages[i];
            if (fieldItem === '') {
                return handleMessage('submitMessage', fieldError);
            }

            if (formatItem !== '') {
                return handleMessage('submitMessage', formatError);
            }
        }


        // Format the data to be POSTed.
        const userData = { username, email, password };
        // Create the user.
        axios.post('/api/users/create', userData)
            .then(res => {
                const message = `Thanks for signing up ${username}! Please log in :)`;
                handleMessage('submitMessage', message);
            })
            .catch(err => console.error(err));
    }

    return (
        <Container>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <Label htmlFor="username">Username:</Label>
                    <Input type="text" name="username" value={username} onChange={handleChange} />

                    { usernameMessage === '' ? null : <Message><p>{usernameMessage}</p></Message> }
            
                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" name="email" value={email} onChange={handleChange} />

                    { emailMessage === '' ? null : <Message><p>{emailMessage}</p></Message> }

                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" name="password" value={password} onChange={handleChange} />

                    { passwordMessage === '' ? null : <Message><p>{passwordMessage}</p></Message> }

                    <Label htmlFor="verifyPassword">Verify your password:</Label>
                    <Input type="password" name="verifyPassword" value={verifyPassword} onChange={handleChange} />
            
                    { verifyPasswordMessage === '' ? null : <Message><p>{verifyPasswordMessage}</p></Message> }

                    <SubmitButton type="submit">Sign Up</SubmitButton>
                    
                    { submitMessage === '' ? null : <Message><p>{submitMessage}</p></Message> }
                </Form>
            </FormWrapper>
        </Container>
    );
}
