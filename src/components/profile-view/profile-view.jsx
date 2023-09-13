import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";

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



    //remove favorite

    const removeFavorite = (_id) => {


        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username + "/movies/" + _id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

        }).then((response) => {
            window.location.reload()
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(user))
                setFavorites(user.FavoriteMovies)
                alert("Movie removed!")
            } else {
                alert("Movie failed to be removed!")
            }

        }).catch((e) => {
            alert("Something went wrong!");
        });


    }








    /*
    
    
    
    body: JSON.stringify(data)
}).then((response) => response.json())
    .then((data) => {
        console.log("Login response: ", data);
        if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            setFavorites(data.FavoriteMovies)
        } else {
            alert("No such user!");
        }
    }).catch((e) => {
        alert("Something went wrong!");
    });
}
 
   /* method: "DELETE",
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`}
   
    
    }).then((response) => {
        if (response.ok) {
            alert("Movie removed!")
            setUser(user);
        } else {
            alert("Movie failed to be removed!")
        }
    })


} */

    return (

        <>

            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col>
                        <Card style={{ width: '18rem' }}>

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
                        <Card style={{ width: '18rem' }} >
                            <h4>Update user information</h4>
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
                        </Card>
                    </Col>


                </Row>
            </Container>
            <Container >
                <Row >


                    <h5>Favorite Movies:</h5>
                    <p></p>
                    <Row>
                        <Col className="mx-5 d-flex g-8" xs={12} sm={6} md={4} lg={3} fluid >   {favoriteMovies.map((movie) => (
                            <>




                                <Col className="mx-3">

                                    <img src={movie.imageURL} className="px=3" width="200px" height="auto" alt="image" />
                                    <p></p>
                                    <h5>{movie.Title}</h5>
                                    <Link to={'/movies/' + movie.Title}>
                                        <p></p>
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


/*

<Button onClick={()=> removeFavorite(movie._id)}>remove favorite</Button> 
onAddToFavorites={() => handleAddToFavorites(movie._id)}
                onRemoveFromFavorites={() => handleRemoveFromFavorites(movie._id)}
 
<
<Card.Text>   {favoriteMovies.map((movie) => (
        
        <Row>
        <Col className="mt-1">
            {movie.Title}
        </Col>
        <Col>
        <Link to = {'/movies/' + movie.Title}>
        <Button className="m-1">open</Button>
        </Link>
        </Col>
        </Row>
        
    ))}</Card.Text>
 
Col className= "mt-2"> 
        <Link to = {'/movies/' + movie.Title}>
        <Button className="m-3">{movie.Title}</Button>
    </Link>
        </Col>
        
        
        <Card.Text>   {favoriteMovies.map((movie) => (
        
        <Row>
        <Col className="mt-1">
            {movie.Title}
        </Col>
        <Col>
        <Link to = {'/movies/' + movie.Title}>
        <Button className="m-1">open</Button>
        </Link>
        </Col>
        <Col className= "mt-1">
        <Button size="sm" onClick={() => removeFavorite(movie._id)}>remove favorite</Button> 
        </Col>
        </Row>
        
    ))}</Card.Text>
        
        
        
        */