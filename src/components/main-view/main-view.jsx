import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState( /*[

        {
            id:1, 
            title: "Bridesmaids",
            image: "https://www.pluggedin.com/wp-content/uploads/2019/12/bridemaids-1536x1152.jpg ",
            genre: "Comedy",
            description: "Competition between the maid of honor and a bridesmaid, over   who is the brides best friend, threatens to upend the life of an out-of-work pastry chef.",
            director: "Paul Feig"
        },

        {
            id:2,
            title: "Silver Linings Playbook",
            image: "https://m.media-amazon.com/images/I/61G5MSAMngL.jpg",
            genre: "Drama",
            description: "After a stint in a mental institution, former teacher Pat Solitano moves back in with his parents and tries to reconcile with his ex-wife. Things get more challenging when Pat meets Tiffany, a mysterious girl with problems of her own.",
            director: "David O' Russell"
        },
        {
            id:3, 
            title: "Shawshank Redemption",
            image: "https://m.media-amazon.com/images/I/512G9J05RJL._AC_.jpg", 
            genre: "Drama",
            description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
            director: "Frank Darabont"}
    ] */ );

    const [selectedMovies, setSelectedMovies] = useState(null);
    useEffect(() => {
        fetch("https://sbmovie-flix-81059d891de6.herokuapp.com/")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.docs.map((doc) => {
                    return {
                        id: doc.key,
                        title: doc.title,
                        image: url,
                        genre: doc.genre,
                        description: doc.description,
                        director: doc.director
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
                <MovieCard key={movie.id} movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovies(newSelectedMovie);
                    }}
                />

            ))}
        </div>
    );
} 