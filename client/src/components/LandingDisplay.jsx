import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 60%;
    flex-direction: row;
    margin-top: 50px;
`;

const FormWrapper = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Form = styled.form`
    border: 3px solid #1cd6cd;
    border-radius: 7px;
    padding: 25px 10px 25px 10px; 
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 300px;
`;

const Input = styled.input`
    border: 1px solid #b3b4b5;
    border-radius: 4px;
    padding: 5px;
    background-color: transparent;
    width: 200px;
    font-family: inherit;
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

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;

const InfoTitle = styled.h2`
    text-decoration: underline;
`;

const List = styled.ul`
    list-style: square;
    max-width: 85%;
`;

const Item = styled.li`
    text-decoration: under line;
    text-decoration-color: #b3b4b5;
    margin-bottom: 25px;
    font-size: 18px;
`;

const Highlight = styled.span`
    color: #1cd6cd;
    text-decoration: underline;
    text-decoration-color: #b3b4b5;
`;

export default function LandingDisplay() {
    return (
        <Container>
            <div className="typewriter">
                <h1>Daily <Highlight>leetcode();</Highlight> problems, sign up below.</h1>
            </div>

            <Row>
                <InfoContainer>
                   <InfoTitle>Or simple service...</InfoTitle>  
                   <List>
                        <Item>Daily problems with solutions, emailed to you and on this site.</Item>
                        <Item>Leaderboards and commenting</Item>
                        <Item>We are not leetcode. We are focused on consistency, and through doing even one problem a day, you can get better at problem solving.</Item>
                    </List>
                </InfoContainer>

                <FormWrapper>
                    <Form>
                        <Label htmlFor="test">Username:</Label> 
                        <Input name="test" /> 

                        <Label htmlFor="test1">Email:</Label> 
                        <Input name="tes1t" /> 

                        <Label htmlFor="test2">Password:</Label> 
                        <Input name="test2" /> 

                        <Label htmlFor="test3">Verify Password:</Label> 
                        <Input name="test3" /> 
            
                        <SubmitButton>Sign Up</SubmitButton>
                    </Form>
                </FormWrapper>
            </Row>

        </Container>
    );
}
