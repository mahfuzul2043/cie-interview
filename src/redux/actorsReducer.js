import { REMOVE_ACTOR, SELECT_ACTOR } from "./actionTypes";

const initialState = {
    actors: []
}

export default function actorsReducer(state = initialState, action) {
    let actors, actorIndex;
    switch (action.type) {
        case SELECT_ACTOR:
            actors = [...state.actors, action.payload];
            return { actors };
        case REMOVE_ACTOR:
            actors = [...state.actors];
            actorIndex = actors.findIndex(actor => actor.id === action.payload.id)
            actors.splice(actorIndex, 1);
            return { actors };
        default:
            return state;
    }
}