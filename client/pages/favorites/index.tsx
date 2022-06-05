import React, {FC} from 'react';
import MainLayouts from "../../layouts/MainLayouts";
import {getCookie} from "cookies-next";
import axios, {AxiosError} from "axios";
import TrackList from "../../components/TrackList/TrackList";
import AlbumList from "../../components/AlbumList/AlbumList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {ITrack} from "../../types/track";
import {IAlbum} from "../../types/album";
import {profile} from "../../components/UserWindow/UserWindow";

type IndexT = {
    favorite: { tracks: ITrack[], albums: IAlbum[] },
    error: string,
    profile: profile,
    token: string
}

const Index: FC<IndexT> = ({token, favorite, error,profile}) => {
    return (
        <MainLayouts token={token} profile={profile}>
            {error ? (
                <div className="w-full h-full mt-5">
                    <ErrorMessage error={error}/>
                </div>
            ) : (
                <>
                    <div className="w-4/5 mx-auto my-4 bg-dark_blue flex flex-row justify-center items-center text-white">
                        <h1 className="text-white text-3xl w-fit text-left mx-4 my-2 flex justify-start items-center">Favorite
                            tracks</h1>
                    </div>
                    {favorite?.tracks[0] ?
                        (
                            <table className="table-auto w-4/5 mx-auto my-4">
                                <thead>
                                <tr>
                                    <th><h1>Tracks</h1></th>
                                    <th><span>Name</span></th>
                                    <th><span>Artist</span></th>
                                    <th><span>Listen</span></th>
                                </tr>
                                </thead>
                                <TrackList tracks={favorite.tracks} flag={"FV"}/>
                            </table>
                        )
                        :
                        (
                            <div className="w-full h-full m-auto">
                                <ErrorMessage error={"None"}/>
                            </div>
                        )
                    }

                    <div
                        className="w-4/5 mx-auto my-4 bg-dark_blue flex flex-row justify-center items-center text-white">
                        <h1 className="text-white text-3xl w-fit text-left mx-4 my-2 flex justify-start items-center">Favorite
                            albums</h1>
                    </div>
                    {favorite.albums[0] ?
                        (
                            <AlbumList albums={favorite.albums} flag={"FV"}/>
                        )
                        :
                        (
                            <div className="w-full h-full m-auto">
                                <ErrorMessage error={"None"}/>
                            </div>
                        )
                    }
                </>
            )}
        </MainLayouts>
    );
};

export default Index;

// @ts-ignore
export async function getServerSideProps({req, res}) {
    try {
        const token = getCookie("token", {req, res})
        const favorite = (getCookie("favorite", {req, res}) || JSON.stringify([]))
        if (typeof token === "string") {
            const config = {
                "headers": {
                    "Authorization": `Bearer ${JSON.parse(token)}`
                }
            };
            const profile = await axios.get(`http://localhost:5000/user/profile`, config)
            const {userId} = profile.data
            const setFavorite = await axios.post("http://localhost:5000/favorite", {userId, arrayId: favorite}, config)
            return {
                props: {token: token, favorite: setFavorite.data, error: "", profile: profile.data},
            }
        }
        return {
            props: {token, favorite: {tracks: [], albums: []}, error: "Token Invalid", profile: {username: ""}},
        }
    } catch (e: any | AxiosError) {
        if(e && e.response && e.response.data){
            return {
                props: {token: "", favorite: {tracks: [], albums: []}, error: e.response.data.message, profile: {username: ""}},
            }
        }
        return {
            props: {token: "", favorite: {tracks: [], albums: []}, error: "Error when loading favorite", profile: {username: ""}},
        }
    }

}
