import {Dispatch} from "react";
import {TrackAction, TrackActionTypes} from "../../types/track";
import axios, {AxiosError} from "axios";

export const fetchTracks = (token: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer " + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/track', config)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: TrackActionTypes.FETCH_TRACKS_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: "Error when loading tracks"})
        }
    }
}

export const searchTracks = (query: string, token: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer " + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/track/search?query=' + query, config)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка при загрузке треков'})
        }
    }
}