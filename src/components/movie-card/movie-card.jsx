import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";




export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.imageURL} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button
                    onClick={() => onMovieClick(movie)}>
                    Open
                </Button>
            </Card.Body>
        </Card>
    );

};


MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};