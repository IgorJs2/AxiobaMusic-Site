import React, {FC, useEffect, useState} from 'react';
import {Button} from "react-daisyui";
import {useRouter} from "next/router";
import CommentModal from "../../components/CommentModal/CommentModal";
import MainLayouts from '../../layouts/MainLayouts';
import {GetServerSideProps} from "next";
import axios from "axios";
import {ITrack} from "../../types/track";

type TrackIdProps = {
    serverTrack: ITrack
}

const Info: FC<TrackIdProps> = ({serverTrack}) => {


    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()

    const [visible, setVisible] = useState<boolean>(false)

    const openModalCommentForm = () => {
        setVisible(!visible)
    }

    return (

        <MainLayouts>

            <Button className="m-10" onClick={() => {
                router.push("/tracks")
            }}>Return to list</Button>
            <div className="w-9/12 mx-auto my-5 p-4 flex flex-row bg-dark_blue rounded-2xl text-left">
                <div className="w-1/5 flex flex-row justify-center items-center text-center">
                    <img src={"http://localhost:5000/" + track.image} className="h-64 w-64 rounded-2xl"/>
                </div>
                <div className="w-4/5">
                    <h1 className="w-full text-white text-4xl h-1/4 text-left my-4 flex flex-row justify-start items-center bg-blue rounded-2xl p-2">Artist
                        - {track.artist}</h1>
                    <h1 className="w-full/3 text-white text-3xl h-1/4 text-left my-4 flex flex-row justify-start items-center bg-blue rounded-2xl p-2">Name
                        of track - {track.name}</h1>
                    <h1 className="w-full/3 text-white text-2xl h-1/4 text-left my-4 flex flex-row justify-start items-center bg-blue rounded-2xl p-2">Listens
                        - {track.listens}</h1>
                </div>
            </div>
            <div className="w-9/12 mx-auto my-5 p-4 flex flex-col bg-dark_blue rounded-2xl text-left">
                <h1 className="text-white text-3xl">Text</h1>
                <p className="text-white p-2">{track.text}</p>
            </div>
            <div className="w-9/12 mx-auto my-5 p-4 flex flex-col bg-dark_blue rounded-2xl text-left">
                <div className="flex flex-row items-center"><h1 className="text-white text-3xl w-5/6">Comments</h1>
                    <Button
                        className="w-1/6" onClick={openModalCommentForm}>Add comment</Button></div>
                {track.comments.map((elem) => {
                    return (
                        <div className="w-11/12 mx-auto my-2.5 p-4 flex flex-col bg-blue rounded-2xl text-left"
                             key={elem._id}>
                            <h1 className="text-white text-2xl p-2">{elem.username}</h1>
                            <p className="text-white p-2">{elem.text}</p>
                        </div>
                    )
                })}
            </div>
            <CommentModal visible={visible} onClick={openModalCommentForm} track={track} setTrack={setTrack}/>
        </MainLayouts>

    )
        ;
};

export default Info;

export const getServerSideProps: GetServerSideProps = async ({params}) =>{

    const addListen = await axios.get("http://localhost:5000/track/listen/" + params?.id)
    const response = await axios.get("http://localhost:5000/track/" + params?.id)
    return{
        props: {
            serverTrack: response.data
        }
    }
}