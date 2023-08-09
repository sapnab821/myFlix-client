import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token)
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user!");
                }
            }).catch((e) => {
                alert("Something went wrong!");
            });
    }

    return (
        <Col md={5}>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)} required
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password"
                    value={password}
                    onChange={(e) => setPassWord(e.target.value)} required />
            </Form.Group>
            <Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form.Group>
        </Form>
        </Col>
    );
};