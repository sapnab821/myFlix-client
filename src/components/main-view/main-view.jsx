import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser= JSON.parse(localStorage.getItem("user"));
    const storedToken= localStorage.getItem("token");
    const [movies, setMovies] = useState([]);

    const [selectedMovies, setSelectedMovies] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser: null);

    const [token, setToken] = useState(storedToken? storedToken: null);

    useEffect(() => {
        if(!token){
            return;
        }

        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/movies", 
        {
            headers: {Authorization: 'Bearer ${token}'}
        })
            .then((response) => response.json())
            .then((data) => {
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
    }, [token]);

   

    if (!user) {
        return (
        <>
        <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
        }}
         />
         or
         <SignupView />
         </>
      );
    }


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
        <button onClick = {() => {setUser(null); setToken(null);
            localStorage.clear();}}>Logout</button>
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