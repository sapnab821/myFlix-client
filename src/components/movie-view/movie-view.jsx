import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";

import React from "react";




export const MovieView = ({ movie, onBackClick }) => {
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
            <button onClick={onBackClick}>Back</button>
    
        </div>
        </Col>
        </Row>
    );
};