import { useSelector } from "react-redux"
import ActorCard from "./ActorCard";

export default function SelectedActors() {
    const actors = useSelector(state => state.actors);

    return (
        <div className="actor-container">
            {actors.map(actor => <ActorCard key={actor.id} actor={actor} />)}
        </div>
    )
}