import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import MainLayouts from "../../layouts/MainLayouts";
import {useDispatch} from "react-redux";
import {NextThunkDispatch, wrapper} from "../../store";
import {getCookie} from "cookies-next";
import axios from "axios";
import TrackList from "../../components/TrackList/TrackList";
import {Button, Input} from "react-daisyui";
import AlbumList from "../../components/AlbumList/AlbumList";

const Index = ({favorite}) => {
    const router = useRouter()
    const dispatch = useDispatch() as NextThunkDispatch

    return (
        <MainLayouts>
            <div className="w-4/5 mx-auto my-4 bg-dark_blue flex flex-row justify-center items-center text-white">
                <h1 className="text-white text-3xl w-fit text-left mx-4 my-2 flex justify-start items-center">Favorite tracks</h1>
            </div>
            <table className="table-auto w-4/5 mx-auto my-4">
                <thead>
                <tr>
                    <th><h1>Tracks</h1></th>
                    <th><span>Name</span></th>
                    <th><span>Artist</span></th>
                    <th><span>Listen</span></th>
                </tr>
                </thead>
                {favorite.tracks[0] ? (
                        <TrackList tracks={favorite.tracks} flag={"FV"}/>
                    )
                    :
                    (
                        <div></div>
                    )}
            </table>
            <div className="w-4/5 mx-auto my-4 bg-dark_blue flex flex-row justify-center items-center text-white">
                <h1 className="text-white text-3xl w-fit text-left mx-4 my-2 flex justify-start items-center">Favorite albums</h1>
            </div>
            {favorite.albums[0] ? (
                    <AlbumList albums={favorite.albums} flag={"FV"}/>
                )
                :
                (
                    <div></div>
                )}
        </MainLayouts>
    );
};

export default Index;


export async function getServerSideProps ({req, res}) {
    const favorite = getCookie("favorite", {req, res})
    const request = await axios.get(`http://localhost:5000/favorite/${favorite}`)
    return {
        props: {favorite: request.data},
    }
}
