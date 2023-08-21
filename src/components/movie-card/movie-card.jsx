import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";



export const MovieCard = ({ user, movie, token }) => {
   

    const addFavoriteMovie = () => {
       
    
        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username +"/movies/" + movie._id, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`}
           
            
            }).then((response) => {
                if (response.ok) {
                    alert("Movie added!")    
                } else {
                    alert("Movie failed to add!")
                }
            })


    }

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.imageURL} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to = {'/movies/' + movie.Title}>
                    <Button variant="link">Open</Button>
                </Link>
                    <Button onClick = {addFavoriteMovie} >Add to Favorites</Button>
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
    
};
