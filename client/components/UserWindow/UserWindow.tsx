import React, {FC, useState} from 'react';
import {Button} from "react-daisyui";
import {removeCookies} from "cookies-next";
import {useRouter} from "next/router";


export type profile = {
    username: string,
}

type UserWindowT ={
   profile?: profile,
}

const UserWindow: FC<UserWindowT> = ({profile}) => {
    const router = useRouter()
    const [visible, setVisible] = useState(false)

    const logoutHandler = () => {
        removeCookies("token")
        router.push("/")
    }

    return (
        <>
            <div className="w-fit h-fit p-2 hover:bg-light_blue transition-all rounded-2xl" id="user-icon" onClick={() => {setVisible(!visible)}}>
                <i className='bx bxs-user text-white p-2'></i>
            </div>

            {visible ?
                (
                    <div className="w-48 h-32 absolute top-14 right-5 bg-light_blue rounded-2xl justify-center items-center text-center flex flex-col" id="modal">
                        <div className="text-white text-2xl mb-auto pt-4">
                            {profile?.username}
                        </div>
                        <Button className="w-1/2 text-center mb-4 justify-center items-center flex" onClick={logoutHandler}><i className='bx bx-log-out '></i>Logout</Button>
                    </div>
                )
            :
                (
                    <></>
                )}
        </>
    );
};

export default UserWindow;
