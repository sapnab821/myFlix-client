import React from "react";
import { useState } from "react";


import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import { Link } from "react-router-dom";


export const ProfileView = ({ setMovies, searchField, setUser, user, movies, token }) => {



    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [FavoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies);



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id))

    // update user information
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
            FavoriteMovies: FavoriteMovies
        };

        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }


        }).then((response) => response.json())
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data)
                alert("update successful!")
            }).catch((e) => {
                alert("update failed!")
            });

    }


    // delete user
    const deleteUser = (e) => {
        e.preventDefault();
        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username, {
            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                localStorage.clear();
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
        });
    };


    return (

        <>

            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col>
                        <Card border="dark" style={{ width: '18rem' }}>

                            <Card.Body>
                                <Card.Title>User Information</Card.Title>
                                <Card.Text>User: {username}</Card.Text>
                                <Card.Text>Email: {email}</Card.Text>
                                <Card.Text>Birthday: {birthday}</Card.Text>

                            </Card.Body>
                        </Card>

                        <Row>
                            <Col>
                                <Button className="mt-3" variant="primary" onClick={handleShow}>
                                    Delete Account
                                </Button>
                            </Col>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to De-register!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        No, Don't Deregister
                                    </Button>
                                    <Button variant="primary" onClick={deleteUser}>
                                        Yes, Deregister
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </Row>
                    </Col>

                    <Col xs={5}>
                        <Card border="dark" style={{ width: '18rem' }} >
                            <Card.Body>
                                <Card.Title>Update User information</Card.Title>
                                <p></p>
                                <Form className="form p-4" onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            // required
                                            minLength="3"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password"

                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        //required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email:</Form.Label>.
                                        <Form.Control type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        // required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control type="date"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                        // required 
                                        />
                                    </Form.Group>
                                    <Button className="m-4" variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container >
                <Row >
                    <Card.Title>Favorite Movies:</Card.Title>
                    <p></p>
                    <Row >
                        <Col className="mx-5 d-flex g-8" xs={12} sm={6} md={4} lg={3} fluid>   {favoriteMovies.map((movie) => (
                            <>
                                <Col>
                                    <img src={movie.imageURL} className="px-4" width="200px" height="auto" alt="image" />
                                    <Card.Text className="px-4">{movie.Title}</Card.Text>
                                    <Link className="px-4" to={'/movies/' + movie.Title}>
                                        <Button className="px-2">open</Button>
                                    </Link>
                                </Col>
                            </>
                        ))}
                        </Col>
                    </Row>



                </Row>

            </Container>



        </>
    )
}


