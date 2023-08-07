import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );

};


MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        genre: Proptypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: Proptypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};