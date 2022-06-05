import React, {FC, useEffect, useState} from 'react';
import {Button, Input} from "react-daisyui";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList/TrackList";
import MainLayouts from "../../layouts/MainLayouts";
import {useDispatch} from "react-redux";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks, searchTracks} from "../../store/action-creators/track";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {getCookie} from "cookies-next";
import {GetServerSideProps} from "next";
import {profile} from "../../components/UserWindow/UserWindow";
import axios from "axios";

type IndexT = {
    token: string,
    profile: profile
}

const Index: FC<IndexT> = ({token, profile}) => {
    const router = useRouter()
    const dispatch = useDispatch() as NextThunkDispatch
    const {tracks, error} = useTypeSelector(state => state.track)
    const [query, setQuery] = useState<string>("")
    const [timer, setTimer] = useState(null)

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout()
        }
        // @ts-ignore
        setTimer(setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value, token))
            }, 500)
        )
    }


    useEffect( () => {
        dispatch(fetchTracks(token))
    }, [token])

    return (
        <MainLayouts token={token} profile={profile}>
            <div className="w-4/5 mx-auto my-4 bg-dark_blue flex flex-row justify-center items-center text-white">
                <h1 className="text-white text-3xl w-fit text-left mx-4 my-2 flex justify-start items-center">Track
                    list</h1>
                <Input onChange={search} className={"text-white w-2/6 mx-auto bg-blue placeholder-white"} color="info"
                       placeholder="Search"/>
                <Button className="w-1/6 text-right m-2" onClick={() => {
                    router.push("tracks/create")
                }}>Add new track</Button>
            </div>
            {error ?
                (<ErrorMessage error={error}/>)
                :
                (<table className="table-auto w-4/5 mx-auto my-4">
                <thead>
                <tr>
                    <th><h1>Tracks</h1></th>
                    <th><span>Name</span></th>
                    <th><span>Artist</span></th>
                    <th><span>Listen</span></th>
                </tr>
                </thead>
                {tracks[0] ? (
                        <TrackList tracks={tracks}/>
                    )
                    :
                    (
                        <></>
                    )}
            </table>)}
        </MainLayouts>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    try{
        const cookie = getCookie("token", {req, res})
        if (typeof cookie === "string") {
            const token = JSON.parse(cookie)
            const config = {
                "headers": {
                    "Authorization": `Bearer ${token}`
                }
            };
            const profile = await axios.get("http://localhost:5000/user/profile", config)
            if(profile){
                return{
                    props: {token: token, profile: profile.data}
                }
            }
        }
        return{
            props: {token: "", profile: {username: ""}}
        }
    } catch (e) {
        return{
            props: {token: "", profile: {username: ""}}
        }
    }
}

