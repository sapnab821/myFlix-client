import { useParams } from "react-router";
import {Link} from "react-router-dom";

import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Card} from "react-bootstrap";

import React from "react";


export const MovieView = ({ movies }) => {
    const {Title} = useParams();
    const movie = movies.find((m) => m.Title === Title);

    return (
       <Card className="mt-1 mb-1 w=100 h-100 bg-secondary text-white" >
             <Card.Img variant="top" src={movie.imageURL}/>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>Description: {movie.Description}</Card.Text>
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Card.Text>Bio: {movie.Director.Bio}</Card.Text>
                <Card.Text>Birthday: {movie.Director.Birthday}</Card.Text>
                <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                <Card.Text>Description: {movie.Genre.Description}</Card.Text>
                
            </Card.Body>
            <Link to={"/"}>
            <Button className="back-button">Back</Button>
            </Link>
        </Card> 
   
    );
}; 

/*
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

