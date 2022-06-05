import {combineReducers} from "redux";
import {playerReducer} from "./playerReducer";
import {HYDRATE} from "next-redux-wrapper";
import {trackReducer} from "./trackReducer";
import {albumReducer} from "./albumReducer";
import {userReducer} from "./userReducer";


const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
    album: albumReducer,
    user: userReducer
})

export const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }
        if (state.count) nextState.count = state.count
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export type RootState = ReturnType<typeof rootReducer>