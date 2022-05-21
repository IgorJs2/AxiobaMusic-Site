import React, {useState} from 'react';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {NextThunkDispatch, wrapper} from "../../store";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import MainLayouts from "../../layouts/MainLayouts";
import {Button, Input} from "react-daisyui";
import AlbumList from "../../components/AlbumList/AlbumList";
import {GetServerSideProps} from "next";
import axios from "axios";
import {fetchTracks} from "../../store/action-creators/track";
import {fetchAlbums} from "../../store/action-creators/album";

const Index = ({}) => {

    const router = useRouter()
    const dispatch = useDispatch() as NextThunkDispatch
    const {albums} = useTypeSelector(state => state.album)
    const [query, setQuery] = useState<string>("")
    const [timer, setTimer] = useState(null)

    return (
        <MainLayouts>
            <div className="w-4/5 mx-auto my-4 bg-dark_blue flex flex-row justify-center items-center text-white">
                <h1 className="text-white text-3xl w-fit text-left mx-4 my-2 flex justify-start items-center">Albums
                    list</h1>
                <Input className={"text-white w-2/6 mx-auto bg-blue placeholder-white"} color="info"
                       placeholder="Search"/>
                <Button className="w-1/6 text-right m-2" onClick={() => {
                    router.push("albums/create")
                }}>Add new album</Button>
            </div>
            <AlbumList albums={albums}/>
        </MainLayouts>
    );
};

export default Index;


Index.getInitialProps = wrapper.getInitialPageProps(
    ({dispatch}) =>
        async () => {
            await dispatch(fetchAlbums());
        }
);