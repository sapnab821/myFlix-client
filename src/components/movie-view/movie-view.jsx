import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";

import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";

import React from "react";


export const MovieView = ({ user, movies, token }) => {
    const { Title } = useParams();
    const movie = movies.find((m) => m.Title === Title);

    const [favorites, setFavorites] = useState(user.FavoriteMovies);
    console.log("==favorites==", favorites)
    const isInFavoritesList = () => {
        if (favorites.find(fav => fav === movie._id)) return true
        return false
    }

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
                setFavorites(data.FavoriteMovies);
                alert("Movie added!")
            })
    }

    const removeFavoriteMovie = () => {
     fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username + "/movies/" + movie._id, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

        })
        
        
        .then((response) => 
        response.json())
            .then((data) => {
                setFavorites(data.FavoriteMovies)
                localStorage.setItem("user", JSON.stringify(data))
                //alert("movie removed!"
            }).catch((e) => {
                alert("Something went wrong!");
            });
        }
    

    return (
        <Card style={{ width: '55rem' }} >
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
                                    isInFavoritesList() ? <Button variant="danger" onClick={removeFavoriteMovie}>Remove Favorite</Button> : <Button variant = "success" onClick={addFavoriteMovie}>Add to Favorites</Button>
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

/*
 }).then((response) => 
                response.json())
                   
                        if (response.ok){
                            
                            setFavorites(user.FavoriteMovies)
                            localStorage.setItem("user", JSON.stringify(user));
                            
                            alert("movie removed!")
                            
                        }
                        else{alert("movie not removed!")
                        
                    }
                }


        <Row className= "justify-md-content-center">
        <Col md={8}>
        <div>
            <div>
                <div>
                <img src={movie?.imageURL} alt/>
                </div>
            </div> 
            <div>
            <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <Link to ={ '/'}>
            <Button className="back-button">Back</Button>
            </Link>
        </div>
        </Col>
        </Row>*/

/*
import { useParams } from "react-router";
import {Link} from "react-router-dom";
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";

import React from "react";




export const MovieView = ({ movies }) => {
    const {movieTitle} = useParams();
    const movie = movies.find((movie) => movie.title === movieTitle);
    return (
        <Row className= "justify-md-content-center">
        <Col md={8}>
        <div>
            <div>
                <div>
                <img src={movie.imageURL} alt/>
                </div>
            </div> 
            <div>
            <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <Link to ={ '/'}>
            <button className="back-button">Back</button>
            </Link>
    
        </div>
        </Col>
        </Row>
    );
}; */

