import React, {FC, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {NextThunkDispatch, wrapper} from "../../store";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import MainLayouts from "../../layouts/MainLayouts";
import {Button, Input} from "react-daisyui";
import AlbumList from "../../components/AlbumList/AlbumList";
import {fetchAlbums, searchAlbums} from "../../store/action-creators/album";
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
    const {albums, error} = useTypeSelector(state => state.album)
    const [query, setQuery] = useState<string>("")
    const [timer, setTimer] = useState(null)

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout()
        }
        // @ts-ignore
        setTimer(setTimeout(async () => {
                await dispatch(await searchAlbums(e.target.value, token))
            }, 500)
        )
    }

    useEffect( () => {
        dispatch(fetchAlbums(token))
    }, [token])


    return (
        <MainLayouts token={token} profile={profile}>
            <div className="w-4/5 mx-auto my-4 bg-dark_blue flex flex-row justify-center items-center text-white">
                <h1 className="text-white text-3xl w-fit text-left mx-4 my-2 flex justify-start items-center">Albums
                    list</h1>
                {!error ? (
                    <>
                        <Input className={"text-white w-2/6 mx-auto bg-blue placeholder-white"} onChange={search} color="info"
                               placeholder="Search"/>
                        <Button className="w-1/6 text-right m-2" onClick={() => {
                            router.push("albums/create")
                        }}>Add new album</Button>
                    </>
                ) : (
                    <>
                        <Input className={"text-white w-2/6 mx-auto bg-blue placeholder-white"} disabled={true}
                               color="info"
                               placeholder="Search"/>
                        <Button className="w-1/6 text-right m-2" disabled={true} onClick={() => {
                            router.push("albums/create")
                        }}>Add new album</Button>
                    </>
                )}
            </div>
            {!error ? (
                <AlbumList albums={albums}/>
            ) : (
                <ErrorMessage error={error}/>
            )}
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
            return{
                props: {token: token, profile: profile.data}
            }
        }
        return{
            props: {token: ""}
        }
    } catch (e) {
        return{
            props: {token: ""}
        }
    }
}

