import React, {FC} from 'react';
import {IAlbum} from "../../types/album";
import AlbumItem from "./AlbumItem/AlbumItem";

interface AlbumListProps {
    albums: IAlbum[],
    flag?: string,
}


const AlbumList: FC<AlbumListProps> = ({albums, flag}) => {

    return (
        <div className="flex flex-row justify-center items-center text-center">
        {albums.map((elem, i) => {
            return (
                <AlbumItem album={elem} key={elem._id} flag={flag}/>
            )
        })}
        </div>
    );
};

export default AlbumList;