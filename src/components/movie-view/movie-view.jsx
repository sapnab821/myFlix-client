import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";

import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";




export const MovieView = ({ setUser, user, movies, token }) => {
    const { Title } = useParams();
    const movie = movies.find((m) => m.Title === Title);


    const [isFavorite, setIsFavorite] = useState(user.FavoriteMovies.includes(movie._id))


    const addFavoriteMovie = () => {
        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username + "/movies/" + movie._id, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }).then((response) => response.json())

            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(user)
                setIsFavorite(true)
                alert("Movie added!")
            })
    }

    const removeFavoriteMovie = () => {
        data = fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username + "/movies/" + movie._id, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }).then((response) =>
            response.json())
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data))
                setUser(data)
                setIsFavorite(false)
                alert("movie removed!")
            }).catch((e) => {
                alert("Something went wrong!");
            });
    }


    return (
        <Card bg={"light"} border="dark" style={{ width: '55rem' }} >
            <Row>
                <Col><Card.Img variant="top" src={movie.imageURL} /></Col>
                <Col>
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>Description: {movie.Description}</Card.Text>
                        <Card.Text>Director: {movie.Director.Name}</Card.Text>
                        <Card.Text>Bio: {movie.Director.Bio}</Card.Text>
                        <Card.Text>Birthday: {movie.Director.Birthday}</Card.Text>
                        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                        <Card.Text>Description: {movie.Genre.Description}</Card.Text>
                        <Row>
                            <Col>
                                {
                                    isFavorite ? <Button variant="danger" onClick={removeFavoriteMovie}>Remove Favorite</Button> : <Button variant="success" onClick={addFavoriteMovie}>Add Favorite</Button>
                                }
                            </Col>
                            <Col>
                                <Link to={"/"}>
                                    <Button className="back-button">Home</Button>
                                </Link>
                            </Col>

                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>

    );
};

