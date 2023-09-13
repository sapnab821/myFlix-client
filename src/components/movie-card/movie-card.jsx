import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";



export const MovieCard = ({ user, movie, token }) => {
    
    const [favorites, setFavorites] = useState(user.FavoriteMovies);
    console.log("==favorites==", favorites)
    const isInFavoritesList = () => {
        if (favorites.find(fav => fav == movie._id)) return true
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

            .then((user) => {
                localStorage.setItem("user", JSON.stringify(user));
                setFavorites(user.FavoriteMovies)
                alert("Movie added!")
            })
    }

    const removeFavoriteMovie = () => {
        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username + "/movies/" + movie._id, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            response.json();
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

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movie.imageURL} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={'/movies/' + movie.Title}>
                    <Button className="m-3">Open</Button>
                </Link>
               
                {/* <Button variant="outline-dark" onClick={addFavoriteMovie}>Add to Favorites</Button> */}
            </Card.Body>
        </Card>
    )
}


MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired
    }).isRequired
   // user: PropTypes.object, // New PropTypes for user
   // setUser: PropTypes.func.isRequired, // New PropTypes for setUser
   // token: PropTypes.string.isRequired, // New PropTypes for token

};







    /*
 {
                    isInFavoritesList() ? <Button variant="danger" onClick={removeFavoriteMovie}>Remove Favorite</Button> : <Button variant="success" onClick={addFavoriteMovie}>Add to Favorites</Button>
                }
               
 const [favorites, setFavorites] = useState(user.FavoriteMovies);
    console.log("==favorites==", favorites)
    const isInFavoritesList = () => {
        if (favorites.find(fav => fav == movie._id)) return true
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

            .then((user) => {
                localStorage.setItem("user", JSON.stringify(user));
                setFavorites(user.FavoriteMovies)
                alert("Movie added!")
            })
    }

    const removeFavoriteMovie = () => {
        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/users/" + user.Username + "/movies/" + movie._id, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
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

     {
                    isInFavoritesList() ? <Button variant="danger" onClick={removeFavoriteMovie}>Remove Favorite</Button> : <Button variant="success" onClick={addFavoriteMovie}>Add to Favorites</Button>
                }

    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(response)
}).then((response) => response.json())
    .then((response) => {
        console.log("Login response: ", movie);
        if (movie) {
            localStorage.setItem("user", JSON.stringify(response));
            setFavorites(user.FavoriteMovies)
        } else {
            alert("No such user!");
        }
    }).catch((e) => {
        alert("Something went wrong!");
    });
}*/