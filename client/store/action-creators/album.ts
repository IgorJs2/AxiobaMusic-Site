import {Dispatch} from "react";
import {AlbumAction, AlbumActionTypes} from "../../types/album";
import axios, {AxiosError} from "axios";

export const fetchAlbums = (token: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer " + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/album', config)
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: "Error when loading albums"})
        }
    }
}

export const searchAlbums = (query: string, token: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer " + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/album/search?query=' + query, config)
            if(response.data.error){
                dispatch({
                    type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                    payload: response.data.error})
                return 0
            }
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Произошла ошибка при загрузке треков'})
        }
    }
}