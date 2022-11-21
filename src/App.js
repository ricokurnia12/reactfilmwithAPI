import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";

const App = () => {
    const [TopRateMovie, setTopRateMovie] = useState([]);

    useEffect(() => {
        getMovieList().then((result) => {
            setTopRateMovie(result);
        });
    }, []);

    const RatedMovieList = () => {
        return TopRateMovie.map((movie, i) => {
            return (
                <div className="Movie-wrapper" key={i}>
                    <div className="Movie-title">{movie.title}</div>
                    <img
                        className="Movie-image"
                        src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
                    />

                    <div className="Movie-date">
                        {movie.release_date}
                    </div>
                    <div className="Movie-rate">
                        {movie.vote_average}
                    </div>
                </div>
            );
        });
    };
    const search = async (q) => {
        if (q.length >= 1) {
            const query = await searchMovie(q);
            setTopRateMovie(query.results);
        }
    };

    return (
        <div>
            <header className="App-header">
                <h1>Coco Movie</h1>
                <input
                    placeholder="search movies"
                    className="Movie-search"
                    onChange={({ target }) => search(target.value)}
                />
                <div className="Movie-container">
                    <RatedMovieList />
                </div>
            </header>
        </div>
    );
};

export default App;
