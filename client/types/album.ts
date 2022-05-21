import {ITrack} from "./track";

export interface IAlbum{
    _id: string,
    username: string,
    group: string,
    name: string,
    image: string,
    listens: 0,
    tracks: ITrack[]
}

export interface AlbumState {
    albums: IAlbum[];
    error: string;
}

export enum AlbumActionTypes {
    FETCH_ALBUMS = 'FETCH_ALBUMS',
    FETCH_ALBUMS_ERROR = 'FETCH_ALBUMS_ERROR',
}

interface FetchAlbumsAction {
    type: AlbumActionTypes.FETCH_ALBUMS;
    payload: IAlbum[]
}

interface FetchAlbumsErrorAction {
    type: AlbumActionTypes.FETCH_ALBUMS_ERROR;
    payload: string
}

export type AlbumAction = FetchAlbumsAction | FetchAlbumsErrorAction