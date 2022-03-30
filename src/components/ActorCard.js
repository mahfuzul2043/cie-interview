import { useDispatch } from "react-redux"
import { removeActor } from "../redux/actions";

export default function ActorCard({ actor }) {
    const dispatch = useDispatch();

    return (
        <div onClick={() => dispatch(removeActor(actor))} className='actor-card'>
            <img className='actor-img' alt='Actor' src={`https://image.tmdb.org/t/p/w500${actor.images.profiles[0]?.file_path}`} />
            <br />
            {actor.name}
        </div>
    )
}