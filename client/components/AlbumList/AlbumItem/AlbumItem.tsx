import React, {FC, useEffect} from 'react';
import {IAlbum} from "../../../types/album";
import {Button, Card} from "react-daisyui";
import {useRouter} from "next/router";
import {useCookie} from "../../../hooks/useCookie";
import {useAction} from "../../../hooks/useAction";

type AlbumItem = {
    album: IAlbum,
    flag? :string
}

const AlbumItem: FC<AlbumItem> = ({album, flag}) => {
    const router = useRouter()
    const {setCookieForFavorite, checkFavorite} = useCookie()

    useEffect(() => {checkFavorite()})

    const setFavorite = (e: any) => {
        e.stopPropagation()
        const id = e.target.getAttribute("data-id")
        setCookieForFavorite(id)
    }


    return (
        <Card className="w-1/6 h-fit mx-2  border-dark_blue border-4 hover:border-light_blue transition-all">
            <div className="w-full h-fit flex justify-end items-end text-right">
                {flag === "FV" ? (<></>) : (<i className='bx bxs-heart text-white text-2xl p-3 rounded-3xl transition-all hover:bg-light_blue'
                                               data-id={album._id} onClick={setFavorite}></i>)}
            </div>
            <Card.Image
                src={"http://localhost:5000/" + album?.image} className="w-2/4 h-1/4 rounded-full p-2"
            />
            <Card.Body className="">
                <Card.Title className="text-white text-3xs truncate ..." tag="h2">Album name: {album.name}</Card.Title>
                <Card.Title className="text-white text-3xs truncate ..." tag="h2">Author: {album.username}</Card.Title>
                <Card.Title className="text-white text-3xs truncate ..." tag="h2">Group: {album.group}</Card.Title>
                <Card.Actions className="justify-end mt-5">
                    <Button color="primary" onClick={() => router.push("albums/" + album._id)}>Open Album</Button>
                </Card.Actions>
            </Card.Body>
        </Card>
    );
};

export default AlbumItem;