import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovies, setSelectedMovies] = useState(null);

    useEffect(() => {
        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
               // console.log(data);
               //setMovies(movies);
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        imageURL: movie.imageURL,
                        Genre: {
                            Name: movie.Genre.Name
                        },
                        Description: movie.Description,
                        Director: {
                            Name: movie.Director.Name
                        }
                };
                });
                setMovies(moviesFromApi);
            });
    }, []);

    if (movies.length === 0) {
        return <div>The List is empty!</div>
    } 

    

    if (selectedMovies) {
        return (
            <MovieView movie={selectedMovies} onBackClick={() =>
                setSelectedMovies(null)} />
        );
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard 
                            key={movie._id}
                            movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovies(newSelectedMovie);
                    }}
                />

            ))}
        </div>
    );
} 