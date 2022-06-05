import React, {FC, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import {Button, Form, Input, InputGroup, Select, Textarea} from "react-daisyui";
import FileUpload from "../../components/FileUpload/FileUpload";
import MainLayouts from "../../layouts/MainLayouts";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import CustomSelect from "../../components/CustomsSelect/CustomSelect";
import {getCookie} from "cookies-next";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {GetServerSideProps} from "next";
import {profile} from "../../components/UserWindow/UserWindow";

type CreateT = {
    token: string,
    profile: profile
}

const Create: FC<CreateT> = ({token,profile}) => {
    const router = useRouter()

    const username = useInput("")
    const group = useInput("")
    const name = useInput("")

    const [tracks, setTracks] = useState([
        {name: "", artist: ""},
        {name: "", artist: ""},
        {name: "", artist: ""},
        {name: "", artist: ""},
        {name: "", artist: ""},
        {name: "", artist: ""},
        {name: "", artist: ""},
        {name: "", artist: ""},
        {name: "", artist: ""},
        {name: "", artist: ""},
    ])

    const [ActiveForm, setActiveForm] = useState(1)
    const [numbersOfTrack, setNumbersOfTrack] = useState(1)

    const [preview, setPreview] = useState<string>()

    const [Picture, setPicture] = useState<File>()

    const [Audio, setAudio] = useState<File[]>([])


    const SelectOptions = [
        {label: "1", value: 1, name: "numbers"},
        {label: "2", value: 2, name: "numbers"},
        {label: "3", value: 3, name: "numbers"},
        {label: "4", value: 4, name: "numbers"},
        {label: "5", value: 5, name: "numbers"},
        {label: "6", value: 6, name: "numbers"},
        {label: "7", value: 7, name: "numbers"},
        {label: "8", value: 8, name: "numbers"},
        {label: "9", value: 9, name: "numbers"},
        {label: "10", value: 10, name: "numbers"},
    ]

    useEffect(() => {
        if (!Picture) {
            setPreview("")
            return
        }
        // @ts-ignore
        if (Picture) {
            const objectUrl = URL.createObjectURL(Picture)
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        }
    }, [Picture])

    const submitHandler = () => {
        const formData = new FormData()
        const config = {
            "headers": {
                //@ts-ignore
                "Authorization": `Bearer ${JSON.parse(getCookie("token"))}`
            }
        };
        formData.append('username', username.value)
        formData.append('group', group.value)
        formData.append('name', name.value)
        // @ts-ignore
        formData.append('image', Picture)
        formData.append('artists', "")
        formData.append('names', "")
        Audio.forEach((elem) => {formData.append('audio', elem)})
        tracks.forEach((elem) => {
            if(elem.artist && elem.name !== "") {
                formData.set("artists", formData.get("artists") + " " + elem.artist.split(" ").join("@!"))
                formData.set("names", formData.get("names") + " " + elem.name.split(" ").join("@!"))
            }
        })
        axios.post("http://localhost:5000/album", formData, config).then(res => {router.push("/albums")}).catch(e => console.log(e))
    }
    const tracksHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        const number: number = Number(e.target.getAttribute("data-number"))

        if (name === "name"){
            let result = [...tracks]
            result[number].name = value
            setTracks([...result])
            return 0
        }
        let result = [...tracks]
        result[number].artist = value
        setTracks([...result])
    }

    if(!token){
        return (<MainLayouts token={""}><div className="m-4"><ErrorMessage error={"Unatorized"} /></div></MainLayouts>)
    }

    return (
        <MainLayouts token={token} profile={profile}>
            <div className="w-full h-fit">
                <div className="w-4/6 mx-auto my-10 h-fit flex flex-row justify-center items-center text-center">
                    <CustomStepper currentStep={ActiveForm}/>
                </div>
                <div className="w-full flex flex-row justify-center items-center text-center h-full rounded-2xl ">
                    <>
                        {
                            ActiveForm === 1 ? (
                                <Form className="bg-dark_blue w-4/6 p-4 rounded-2xl text-white">
                                    <Form.Label className="text-white text-2xl text-start justify-start">Album name:</Form.Label>
                                    <Input {...username} type="text" bordered
                                           className="text-white bg-blue rounded-2xl border-none"/>
                                    <Form.Label className="text-white text-2xl text-left justify-start">Enter name of
                                        group:</Form.Label>
                                    <Input {...group} type="text" bordered
                                           className="text-white bg-blue rounded-2xl border-none"/>
                                    <Form.Label className="text-white text-2xl text-left justify-start">Track name:</Form.Label>
                                    <Input
                                        {...name}
                                        className="text-white bg-blue rounded-2xl h-32 border-none resize-none"
                                        name="text"/>
                                    <Button className="text-white text-2xl mt-32 w-2/4 mx-auto" color="success"
                                            onClick={() => {
                                                setActiveForm(ActiveForm + 1)
                                            }}>Next</Button>
                                </Form>
                            ) : (
                                <></>
                            )
                        }  </>
                    <>
                        {
                            ActiveForm === 2 ? (
                                <div
                                    className="bg-dark_blue w-2/6 p-4 rounded-2xl text-white flex flex-col justify-center items-center text-center">
                                    <div className="flex flex-col justify-center items-center text-center w-full h-fit">
                                        <div
                                            className="w-2/6 h-2/6 px-2 py-4 mx-auto my-20 flex flex-row justify-center items-center text-center rounded-2xl">
                                            {Picture && <img src={preview} className="rounded-2xl"/>}
                                        </div>

                                        <FileUpload setFile={setPicture} accept={"image/*"}><Button>Upload
                                            Picture</Button></FileUpload>
                                    </div>
                                    <div className="w-full">
                                        <Button className="text-white text-2xl mt-32 w-2/4 mx-auto" color="success"
                                                onClick={() => {
                                                    setActiveForm(ActiveForm + 1)
                                                }}>Next</Button>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )
                        }  </>
                    <>


                        {
                            ActiveForm === 3 ? (
                                <Form className="bg-dark_blue w-4/6 p-4 rounded-2xl text-white">
                                    <Form.Label className="text-white text-2xl text-start justify-start">Choose numbers of tracks</Form.Label>
                                    <CustomSelect options={SelectOptions} placeholder={"numbers of tracks"} placeholder_image={""} CurrentSelectValue={numbersOfTrack} SetCurrentSelectValue={setNumbersOfTrack}/>
                                    {
                                        SelectOptions.map((elem, i) => {
                                            if(i <= numbersOfTrack - 1){
                                                return (
                                                    <div className="flex flex-row w-full h-full border-4 border-blue mt-2 rounded-2xl justify-start items-start text-center">
                                                        <h1 className="w-1/6 text-white text-2xl rounded-2xl p-2 bg-blue">{i + 1}</h1>
                                                        <Input type="text" data-number={i} name={"name"} onChange={tracksHandler} placeholder="Name of track" className="w-2/6 text-white bg-blue rounded-2xl border-none placeholder-white mx-auto"/>
                                                        <Input type="text" data-number={i} name={"artist"} onChange={tracksHandler} placeholder="Artist" className=" w-2/6 text-white bg-blue rounded-2xl border-none placeholder-white mx-auto"/>
                                                        <FileUpload setFiles={setAudio} accept="audio/">{!(Audio) || Audio[i] == undefined ? (<Button>Upload Audio</Button>) : (<Button disabled={true}>Uploaded</Button>)}</FileUpload>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    <div className="w-full">
                                        <Button className="text-white text-2xl mt-32 w-2/4 mx-auto" color="success" onClick={submitHandler}>Submit</Button>
                                    </div>
                                </Form>
                            ) : (
                                <></>
                            )
                        }
                    </>

                </div>
            </div>
        </MainLayouts>
    );

}

export default Create;

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    try {
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
        console.log(e)
        return {
            props: {token: ""},
        }
    }

}