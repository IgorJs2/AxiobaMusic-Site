import React, {FC} from 'react';
import {useRouter} from "next/router";
import {useAction} from "../../hooks/useAction";
import {ITrack} from "../../types/track";

interface AlbumTrackProps{
    elem: ITrack,
    active?: boolean
}

const AlbumTrack: FC<AlbumTrackProps> = ({elem,  active}) => {
    const router = useRouter()
    const {set_Active} = useAction()


    const play = (e: React.MouseEvent) => {
        e.stopPropagation()
        set_Active(elem)
    }

    return (
        <div className="border-2 border-light_blue rounded-2xl w-5/6 mx-auto flex flex-row justify-center items-center text-center my-2"
             key={elem._id}>
            <div className="w-1/6 flex flex-row items-center justify-center text-center">
            </div>
            <div className="w-3/6 flex flex-col justify-start items-start text-center">
                <div className="text-white text-2xl">{elem.name}</div>
                <div className="text-white text-2xs">{elem.artist}</div>
            </div>
            <div className="w-2/6">
                <button onClick={play} color="info">{active ? (<><i className='text-white bx bx-pause text-2xl bg-blue rounded-2xl p-2 hover:bg-light_blue transition-all'></i></>) : (<><i className='text-white bx bx-play hover:bg-light_blue transition-all text-2xl bg-blue rounded-2xl p-2'></i></>)}</button>
            </div>
        </div>
    );
};

export default AlbumTrack;