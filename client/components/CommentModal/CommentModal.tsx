import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Badge, Button, Divider, Input, Menu, Modal, Textarea} from "react-daisyui";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {ITrack} from "../../types/track";
import {getCookie} from "cookies-next";

type Props = {
    visible: boolean,
    onClick: () => void,
    track: ITrack,
    setTrack: (p: ITrack) => void
}

interface CommentData {
    text: string,
}

const CommentModal: FC<Props> = ({visible, onClick, track, setTrack}) => {
    const username = useInput("")
    const text = useInput("")

    const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const config = {
            "headers": {
                // @ts-ignore
                "Authorization": `Bearer ${JSON.parse(getCookie("token").toString())}`
            }
        };
        const response = await axios.post("http://localhost:5000/track/comment", {
            username: username.value,
            text: text.value,
            trackId: track._id
        }, config)
        setTrack({...track, comments: [...track.comments, response.data]})
    }


    return (
        <>
            <Modal open={visible} onClickBackdrop={onClick} className="bg-blue">
                <Modal.Body>
                    <Menu className="bg-base-100 w-full flex flex-col bg-blue">
                        <Menu.Item className="w-full">
                            <div
                                className="text-white text-2xl bg-transparent border-none mt-2.5 mb-2.5 text-left justify-start flex flex-row">Username:
                            </div>
                            <Input {...username}
                                   className="text-white bg-dark_blue rounded-md border-none resize-none"
                                   placeholder="username" name="username" />
                            <div
                                className="text-white text-2xl bg-transparent border-none mt-2.5 mb-2.5 text-left justify-start flex flex-row">Comment:
                            </div>
                            <Input {...text}
                                      className="text-white bg-dark_blue rounded-md border-none resize-none"
                                      placeholder="comment" name="text" />
                        </Menu.Item>
                    </Menu>
                </Modal.Body>

                <Modal.Actions>
                    <Button onClick={submitHandler} color="success" className="text-white">
                        Send comment
                    </Button>
                    <Button onClick={onClick} color="error" className="text-white">Cancel</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
};

export default CommentModal;