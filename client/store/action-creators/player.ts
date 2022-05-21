import {PlayerAction, PlayerActionTypes} from "../../types/player";
import {ITrack} from "../../types/track";


export const playTrack = (): PlayerAction => {
    return {type: PlayerActionTypes.PLAY}
}
export const pauseTrack = (): PlayerAction => {
    return {type: PlayerActionTypes.PAUSE}
}
export const set_Current_Time_Track = (payload: number): PlayerAction => {
    return {payload, type: PlayerActionTypes.SET_CURRENT_TIME}
}
export const set_Volume = (payload: number): PlayerAction => {
    return {payload, type: PlayerActionTypes.SET_VOLUME}
}
export const set_Duration = (payload: number): PlayerAction => {
    return {payload, type: PlayerActionTypes.SET_DURATION}
}
export const set_Active = (payload: ITrack): PlayerAction => {
    return {payload, type: PlayerActionTypes.SET_ACTIVE}
}