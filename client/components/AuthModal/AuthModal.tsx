import React, {Dispatch, FC, useEffect, useState} from 'react';
import {Button, Divider, Input, Menu, Modal} from "react-daisyui";
import axios from "axios";
import {useRouter} from "next/router";
import {AuthModalFormChanger, ClearInputErrors, AutorizePass} from "../../UIChangers/AuthModalFormChanger";
import {useDispatch} from "react-redux";
import {fetchUser} from "../../store/action-creators/user";
import {useAction} from "../../hooks/useAction";
import {useCookie} from "../../hooks/useCookie";

type Props = {
    visible: boolean,
    onClick: () => void,
}

interface AuthData {
    login: string,
    email: string,
    password: string,
    type: string,
}

const AuthModal: FC<Props> = ({visible, onClick}) => {
    const [ActiveAuthType, setActiveAuthType] = useState("Login")
    const {setCookieForAuth, checkToken} = useCookie()
    const {fetchUser} = useAction()
    const router = useRouter()

    const [form, setForm] = useState<AuthData>(
        {
            login: "",
            email: "",
            password: "",
            type: "Login",
        }
    )

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        ClearInputErrors(e.target.getAttribute("id"))
        setForm({...form, [e.target.name]: e.target.value});

    }

    const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (form.type === "Register") {
            axios.post("http://localhost:5000/user", {
                login: form.login,
                email: form.email,
                password: form.password
            }).then((res) => {
                if (res.data.errors) {
                    AuthModalFormChanger(res.data.errors, res.data.fields)
                } else {
                    AutorizePass(["ALL"])
                    setTimeout(() => {
                        setActiveAuthType("Login")
                        setForm({...form, "type": ActiveAuthType});
                    }, 1000)
                }
                return 0
            }).catch((e) => {
                console.log(e)
                return 0
            })
        }
        if (form.type === "Login") {

            axios.post("http://localhost:5000/auth/login", {
                username: form.login,
                password: form.password
            }).then((res) => {
                AutorizePass(["Login", "Password"])
                setCookieForAuth(res.data.access_token)
                if(checkToken()){
                    setTimeout(() => {
                        router.push("/tracks")
                    }, 1000)
                }
                fetchUser()
                return 0
            }).catch((e) => {
                AuthModalFormChanger(["LOGIN:Login or password incorrect", "PASSWORD:Login or password incorrect"], ["Login", "Password"])
            })

        }
    }

    useEffect(() => {
        setForm({...form, "type": ActiveAuthType});
    }, [ActiveAuthType])


    return (
        <>
            <Modal open={visible} onClickBackdrop={onClick} className="bg-blue">
                <Modal.Header>
                    <div className="bg-base-200 bg">
                        <Menu className="bg-base-100 w-full flex flex-row bg-blue">
                            <Menu.Item className="w-full">
                                <a onClick={() => {
                                    setActiveAuthType("Login")
                                }}
                                   className={ActiveAuthType === "Login" ? "flex text-center items-center text-white justify-center rounded-3xl border-2 border-light_blue active" : "flex text-center text-white items-center rounded-3xl justify-center border-2 border-dark_blue"}>Login</a>
                            </Menu.Item>
                            <Menu.Item className="w-full">
                                <a onClick={() => {
                                    setActiveAuthType("Register")
                                }}
                                   className={ActiveAuthType === "Register" ? "flex text-center text-white items-center justify-center rounded-3xl border-2 border-light_blue active" : "flex text-center text-white items-center rounded-3xl justify-center border-2 border-dark_blue"}>Register</a>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    {
                        ActiveAuthType === "Login" ? (
                            <>
                                <Menu className="bg-base-100 w-full flex flex-col bg-blue">
                                    <Menu.Item className="w-full">
                                        <div
                                            className="text-white text-2xl bg-transparent border-none mt-2.5 mb-2.5 cursor-default">Login:
                                        </div>
                                        <h1 id="loginError"
                                            className="text-red text-center relative px-1 py-2 hover:bg-transparent hover:cursor-default hidden">•
                                        </h1>
                                        <Input type="text" id="login"
                                               className="text-white bg-dark_blue rounded-md border-none "
                                               placeholder="login" name="login" onChange={changeHandler}/>
                                    </Menu.Item>
                                    <Menu.Item className="w-full">
                                        <div
                                            className="cursor-default text-white text-2xl bg-transparent border-none mt-2.5 mb-2.5 text-left justify-start flex flex-row">Password:
                                        </div>
                                        <h1 id="passwordError"
                                            className="text-red text-center relative px-1 py-2 hover:bg-transparent hover:cursor-default hidden">•
                                        </h1>
                                        <Input type="password" id="password"
                                               className="text-white bg-dark_blue rounded-md border-none"
                                               placeholder="password" name="password" onChange={changeHandler}/>
                                    </Menu.Item>
                                </Menu>
                                <div className="flex flex-col w-full mt-8">
                                    <Button
                                        className="grid h-10 card rounded-box place-items-center text-white m-2">Sign
                                        in with Google</Button>
                                    <Divider className="m-0"></Divider>
                                    <Button
                                        className="grid h-10 card rounded-box place-items-center text-white m-2">Sign
                                        in with Facebook</Button>
                                </div>
                            </>


                        ) : (
                            <>
                                <Menu className="bg-base-100 w-full flex flex-col bg-blue">
                                    <Menu.Item className="w-full">
                                        <div
                                            className="cursor-default text-white text-2xl bg-transparent border-none mt-4 mb-1 py-0 active:bg-transparent">Login:
                                        </div>
                                        <h1 id="loginError"
                                            className="text-red text-center relative px-1 py-2 hover:bg-transparent hover:cursor-default hidden">•
                                        </h1>
                                        <Input type="text" id="login"
                                               className="text-white bg-dark_blue rounded-md border-none "
                                               placeholder="login" name="login" onChange={changeHandler}/>
                                    </Menu.Item>
                                    <Menu.Item className="w-full">
                                        <div
                                            className="cursor-default text-white text-2xl bg-transparent border-none mt-4 mb-1 py-0 active:bg-transparent">Email:
                                        </div>
                                        <h1 id="emailError"
                                            className="text-red text-center relative px-1 py-2 hover:bg-transparent hover:cursor-default hidden">•
                                        </h1>
                                        <Input type="text" id="email"
                                               className="text-white bg-dark_blue rounded-sm border-none "
                                               placeholder="email" name="email" onChange={changeHandler}/>
                                    </Menu.Item>
                                    <Menu.Item className="w-full">
                                        <div
                                            className="cursor-default text-white text-2xl bg-transparent border-none mt-4 mb-1 py-0 active:bg-transparent">Password:
                                        </div>
                                        <h1 id="passwordError"
                                            className="text-red text-center relative px-1 py-2 hover:bg-transparent hover:cursor-default hidden">•
                                        </h1>
                                        <Input type="password" id="password"
                                               className="text-white bg-dark_blue rounded-sm border-none "
                                               placeholder="password" name="password" onChange={changeHandler}/>
                                    </Menu.Item>
                                </Menu>
                                <div className="flex flex-col w-full mt-8">
                                    <Button
                                        className="grid h-10 card rounded-box place-items-center text-white m-2">Sign
                                        in with Google</Button>
                                    <Divider className="m-0"></Divider>
                                    <Button
                                        className="grid h-10 card rounded-box place-items-center text-white m-2">Sign
                                        in with Facebook</Button>
                                </div>
                            </>
                        )
                    }
                </Modal.Body>

                <Modal.Actions>
                    <Button onClick={submitHandler} color="success" className="text-white">
                        Accept
                    </Button>
                    <Button onClick={onClick} color="error" className="text-white">Cancel</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
};

export default AuthModal;