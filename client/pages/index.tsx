import type {NextPage} from 'next'
import MainLayouts from "../layouts/MainLayouts";
import AuthModal from "../components/AuthModal/AuthModal";
import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";

const index: NextPage = () => {
    const router = useRouter()

    useEffect(() => {
        if(getCookie("token")){
            router.push("/tracks")
        }
    }, [])

    return (
        <div>
            <MainLayouts token="">
                <AuthModal visible={true} onClick={() => {}} />
            </MainLayouts>
        </div>
    )
}

export default index
