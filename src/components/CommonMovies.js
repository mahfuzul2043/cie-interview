import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export default function CommonMovies() {
    const actors = useSelector(state => state.actors);
    const [commonMovies, setCommonMovies] = useState([]);

    useEffect(() => {
        if (actors.length === 0) {
            setCommonMovies([]);
        } else if (actors.length === 1) {
            actors[0].movie_credits.cast.forEach(movie => {
                setCommonMovies(prev => [...prev, movie.original_title]);
            })
        } else {
            const actorMovies = [];
            actors.forEach(actor => {
                actorMovies.push(actor.movie_credits.cast.map(movie => movie.original_title))
            })
            const common = actorMovies.reduce((prev, curr) => prev.filter(movie => curr.includes(movie)));
            setCommonMovies(common);
        }
    }, [actors])

    return (
        <div>
            <b>MOVIES:</b>
            <br />
            <br />
            <div className='common-movies-list'>
                {commonMovies.length === 0 ? 'No credits in common' : commonMovies.map((movie, i) => (
                    <div key={movie + i}>{movie}</div>
                ))}
            </div>
        </div>
    )
}