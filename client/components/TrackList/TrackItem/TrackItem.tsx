import React, {FC, useEffect} from 'react';
import {ITrack} from "../../../types/track";
import {useRouter} from "next/router";
import {useAction} from "../../../hooks/useAction";
import {useCookie} from "../../../hooks/useCookie";

interface TrackItemProps {
    elem: ITrack,
    i: number,
    active?: boolean,
    flag?: string,
}

const TrackItem: FC<TrackItemProps> = ({elem, i, active, flag}) => {
    const router = useRouter()
    const {setCookieForFavorite, checkFavorite} = useCookie()
    const {set_Active} = useAction()

    useEffect(() => {checkFavorite()},)


    const play = (e: any) => {
        e.stopPropagation()
        set_Active(elem)
    }

    const setFavorite = (e: any) => {
        e.stopPropagation()
        const id = e.target.getAttribute("data-id")
        setCookieForFavorite(id)
    }


    return (
        <>
            <tr className="border-2 border-light_blue rounded-2xl" onClick={() => {
                router.push(`tracks/${elem._id}`)
            }}
                key={elem._id}>
                <td className="flex flex-row items-center justify-center text-center">
                    {flag === "FV" ? (<></>) : (
                        <i className='bx bxs-heart relative right-10 text-2xl p-3 rounded-3xl transition-all hover:bg-light_blue'
                           data-id={elem._id} onClick={setFavorite}></i>)}
                    <img className="w-16 h-16 bg-blue p-2 rounded-2xl" src={"http://localhost:5000/" + elem.image}/>
                </td>
                <td>{elem.name}</td>
                <td>{elem.artist}</td>
                <td>
                    <button onClick={play} color="info">{active ? (<><i
                        className='bx bx-pause text-2xl bg-blue rounded-2xl p-2 hover:bg-light_blue transition-all'></i></>) : (<>
                        <i className='bx bx-play hover:bg-light_blue transition-all text-2xl bg-blue rounded-2xl p-2'></i></>)}</button>
                </td>
            </tr>
        </>
    );
};

export default TrackItem;