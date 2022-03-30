import { REMOVE_ACTOR, SELECT_ACTOR } from "./actionTypes";

const selectActor = actor => ({
    type: SELECT_ACTOR,
    payload: actor
})

const removeActor = actor => ({
    type: REMOVE_ACTOR,
    payload: actor
})

export { selectActor, removeActor };