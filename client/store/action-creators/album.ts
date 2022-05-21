import {Dispatch} from "react";
import {AlbumAction, AlbumActionTypes} from "../../types/album";
import axios from "axios";

export const fetchAlbums = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/album')
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Произошла ошибка при загрузке треков'})
        }
    }
}

export const searchAlbums = (query: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/albums/search?query=' + query)
            dispatch({type: AlbumActionTypes.FETCH_ALBUMS, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Произошла ошибка при загрузке треков'})
        }
    }
}