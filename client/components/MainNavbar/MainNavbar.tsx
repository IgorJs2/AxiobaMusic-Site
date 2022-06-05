import React, {FC, useState} from 'react';
import {Button, Navbar} from "react-daisyui";
import Link from "next/link";
import AuthModal from "../AuthModal/AuthModal";
import UserWindow from "../UserWindow/UserWindow";
import {profile} from "../UserWindow/UserWindow"
import {getCookie} from "cookies-next";
import axios from "axios";
import {GetServerSideProps} from "next";

type MainNavbarT = {
    token: string,
    profile?: profile
}

const MainNavbar: FC<MainNavbarT> = ({token, profile}) => {
    const [visible, setVisible] = useState<boolean>(false)

    const toggleVisible = () => {
        setVisible(!visible)
    }

    return (
        <Navbar className="bg-dark_blue">
            <Navbar.Start className="px-2 mx-2">
                <span className="text-lg font-bold text-white">AxiobaMusic</span>
            </Navbar.Start>

            <Navbar.Center className="px-2 mx-2">
                <div className="flex items-stretch">
                    <Link href="/tracks"><a className="btn btn-ghost btn-sm rounded-btn text-white">Tracks</a></Link>
                    <Link href="/albums"><a className="btn btn-ghost btn-sm rounded-btn text-white">Albums</a></Link>
                    <Link href="/favorites"><a
                        className="btn btn-ghost btn-sm rounded-btn text-white">Favorites</a></Link>
                </div>
            </Navbar.Center>

            {token ? (
                    <Navbar.End className="px-2 mx-2">
                        <UserWindow profile={profile}/>
                    </Navbar.End>
                ) :
                (
                    <Navbar.End className="px-2 mx-2">
                        <Button onClick={toggleVisible}>Login</Button>
                    </Navbar.End>
                )}

            <AuthModal visible={visible} onClick={toggleVisible}/>
        </Navbar>
    )
};

export default MainNavbar;
