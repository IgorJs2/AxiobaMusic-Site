import React, {FC} from 'react';
import MainNavbar from "../components/MainNavbar/MainNavbar";
import Player from "../components/Player/Player";
import Head from "next/head";
import {profile} from "../components/UserWindow/UserWindow";

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
    token: string;
    profile?: profile
}

const MainLayouts: React.FC<MainLayoutProps>
    = ({
           children,
           title,
           description,
           keywords,
           token,
    profile
       }) => {
    return (
        <>
            <Head>
                <title>{title || 'AxiobaMusic'}</title>
                <meta name="description"
                      content={`AxiobaMusic - это площадка где каждый может оставить свой трек и стать знаменитым.` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Музыка, треки, артисты"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <MainNavbar token={token} profile={profile}/>
            <div className="w-full">
                {children}
            </div>
            <Player/>
        </>
    );
};

export default MainLayouts;