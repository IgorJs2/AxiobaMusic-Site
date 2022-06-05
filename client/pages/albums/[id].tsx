import React, {FC} from 'react';
import {Button} from "react-daisyui";
import {useRouter} from "next/router";
import MainLayouts from '../../layouts/MainLayouts';
import {ITrack} from "../../types/track";
import {useAction} from "../../hooks/useAction";
import AlbumTrack from "../../components/AlbumTrack/AlbumTrack";
import {IAlbum} from "../../types/album";
import axios from "axios";
import {GetServerSideProps} from "next";
import {getCookie} from "cookies-next";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {profile} from "../../components/UserWindow/UserWindow";

type AlbumIdProps = {
    album: IAlbum,
    token: string,
    profile: profile
}

const Info: FC<AlbumIdProps> = ({album, token,profile}) => {

    const router = useRouter()


    if(!token){
        return (<MainLayouts token={""}><div className="m-4"><ErrorMessage error={"Unatorized"} /></div></MainLayouts>)
    }


    return (

        <MainLayouts token={token} profile={profile}>

            <Button className="m-10" onClick={() => {
                router.push("/albums")
            }}>Return to list</Button>
            <div className="w-9/12 mx-auto my-5 p-4 flex flex-row bg-dark_blue rounded-2xl text-left">
                <div className="w-1/5 flex flex-row justify-center items-center text-center">
                    <img src={"http://localhost:5000/" + album.image} className="h-64 w-64 rounded-2xl"/>
                </div>
                <div className="w-4/5 h-fit">
                    <h1 className="w-full text-white text-4xl h-1/4 text-left my-4 flex flex-row justify-start items-center bg-blue rounded-2xl p-2">Posteb
                        by
                        - {album.username}</h1>
                    <h1 className="w-full/3 text-white text-3xl h-1/4 text-left my-4 flex flex-row justify-start items-center bg-blue rounded-2xl p-2">Name
                        of track - {album.name}</h1>
                    <h1 className="w-full/3 text-white text-3xl h-1/4 text-left my-4 flex flex-row justify-start items-center bg-blue rounded-2xl p-2">Group
                        of track - {album.group}</h1>
                    <h1 className="w-full/3 text-white text-2xl h-1/4 text-left my-4 flex flex-row justify-start items-center bg-blue rounded-2xl p-2">Listens
                        - {album.listens}</h1>
                </div>
            </div>
            <div className="w-9/12 mx-auto my-5 p-4 flex flex-col bg-dark_blue rounded-2xl text-left">
                <div className="flex flex-row flex-wrap items-center">
                    <h1 className="text-white text-3xl w-full">Tracks</h1>
                    {album.tracks.map((elem) => {
                        return (
                            <AlbumTrack elem={elem} key={elem._id}/>)
                    })}
                </div>
            </div>
        </MainLayouts>

    )
        ;
};

export default Info;

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    const token = (getCookie("token", {req, res}) || "")
    if(token && typeof token === "string"){
        const config = {
            "headers": {
                "Authorization": `Bearer ${JSON.parse(token)}`
            }
        };
        const addListen = await axios.get("http://localhost:5000/album/listen/" + params?.id, config)
        const response = await axios.get("http://localhost:5000/album/" + params?.id, config)
        const profile = await axios.get("http://localhost:5000/user/profile", config)
        return {
            props: {
                album: response.data,
                token: JSON.parse(token),
                profile: profile.data
            }
        }
    }

    return {
        props: {
            serverTrack: null,
            token: ""
        }
    }
}