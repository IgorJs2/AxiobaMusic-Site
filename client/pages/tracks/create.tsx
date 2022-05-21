import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import CustomStepper from "../../components/CustomStepper/CustomStepper";
import {Button, Form, Input, InputGroup, Textarea} from "react-daisyui";
import FileUpload from "../../components/FileUpload/FileUpload";
import MainLayouts from "../../layouts/MainLayouts";
import {useInput} from "../../hooks/useInput";
import axios from "axios";

const Create = () => {
    const router = useRouter()

    const name = useInput("")
    const artist = useInput("")
    const text = useInput("")
    
    const [ActiveForm, setActiveForm] = useState(1)

    const [preview, setPreview] = useState<string>()

    const [Picture, setPicture] = useState<File>()
    const [Audio, setAudio] = useState<File>()

    const submitHandler = () => {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('artist', artist.value)
        formData.append('text', text.value)
        formData.append('image', Picture)
        formData.append('audio', Audio)

        axios.post("http://localhost:5000/track", formData).then((res) => router.push("/tracks")).catch(e => console.log(e))
    }

    useEffect(() => {
        if (!Picture && !Audio) {
            setPreview("")
            return
        }
        // @ts-ignore
        if(Picture && !Audio) {
            const objectUrl = URL.createObjectURL(Picture)
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        }
        if(Audio){
            const objectUrl = URL.createObjectURL(Audio)
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        }
    }, [Picture, Audio])

    const chooseFileHandler = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length) {
            if(ActiveForm === 2){
                setPicture(target.files[0])
            }
            else{
                setAudio(target.files[0])
            }
        }
    }

return (
    <MainLayouts>
    <div className="w-full h-fit">
        <div className="w-4/6 mx-auto my-10 h-fit flex flex-row justify-center items-center text-center">
            <CustomStepper currentStep={ActiveForm}/>
        </div>
        <div className="w-full flex flex-row justify-center items-center text-center h-full rounded-2xl ">
            <>
                {
                    ActiveForm === 1 ? (
                        <Form className="bg-dark_blue w-4/6 p-4 rounded-2xl text-white">
                            <Form.Label className="text-white text-2xl text-start justify-start">Enter name of
                                track:</Form.Label>
                            <Input {...name} type="text" bordered className="text-white bg-blue rounded-2xl border-none"/>
                            <Form.Label className="text-white text-2xl text-left justify-start">Enter
                                artist:</Form.Label>
                            <Input {...artist} type="text" bordered className="text-white bg-blue rounded-2xl border-none"/>
                            <Form.Label className="text-white text-2xl text-left justify-start">Enter track
                                text:</Form.Label>
                            <Input
                                {...text}
                                className="text-white bg-blue rounded-2xl h-32 border-none resize-none"
                                name="text"/>
                            <Button className="text-white text-2xl mt-32 w-2/4 mx-auto" color="success" onClick={() => {
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
                        <div className="bg-dark_blue w-2/6 p-4 rounded-2xl text-white flex flex-col justify-center items-center text-center">
                            <div className="flex flex-col justify-center items-center text-center w-full h-fit">
                                <div className="w-2/6 h-2/6 px-2 py-4 mx-auto my-20 flex flex-row justify-center items-center text-center rounded-2xl">
                                    {Picture && <img src={preview} className="rounded-2xl"/>}
                                </div>

                                <FileUpload setFile={setPicture} accept={"image/*"}><Button>Upload Picture</Button></FileUpload>
                            </div>
                            <div className="w-full">
                                <Button className="text-white text-2xl mt-32 w-2/4 mx-auto" color="success" onClick={() => {
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
                        <div className="bg-dark_blue w-2/6 p-4 rounded-2xl text-white flex flex-col justify-center items-center text-center">
                            <div className="flex flex-col justify-center items-center text-center w-full h-fit">
                                <div className="w-2/6 h-2/6 px-2 py-4 mx-auto my-20 flex flex-row justify-center items-center text-center rounded-2xl">
                                    {Audio && <audio controls><source src={preview}/></audio>}
                                </div>

                                <FileUpload setFile={setAudio} accept={"audio/*"}><Button>Upload Audio</Button></FileUpload>
                            </div>
                            <div className="w-full">
                                <Button className="text-white text-2xl mt-32 w-2/4 mx-auto" color="success" onClick={submitHandler}>Submit</Button>
                            </div>
                        </div>
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