import React, {useEffect, useState} from 'react';
import styles from "./Player.module.css"
import {Badge, Button, Progress, Range} from "react-daisyui";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useAction} from "../../hooks/useAction";

let audio: HTMLAudioElement;

const Player = () => {
    const [mute, setMute] = useState(false)
    const {active, pause, volume, duration, currentTime} = useTypeSelector(state => state.player)
    const {pauseTrack, playTrack, set_Duration, set_Volume, set_Current_Time_Track} = useAction()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else if (audio){
            setAudio()
        }

    }, [active])

    const playMusic = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    const setAudio = () => {
        if (active) {
            audio.src = "http://localhost:5000/" + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                set_Duration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                set_Current_Time_Track(Math.ceil(audio.currentTime))
            }
        }
    }

    const changeVolume = (e: React.ChangeEvent) => {
        audio.volume = Number(e.target.value) / 100
        set_Volume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent) => {
        audio.currentTime = Number(e.target.value)
        set_Current_Time_Track(Number(e.target.value))
    }

    if (!active) {
        return null
    }


    return (
        <div className={styles.player}>
            <div className="w-4/6 h-full mx-auto flex flex-row justify-center items-center text-center">
                {pause ? (<><i
                        className='bx bx-play text-2xl rounded-2xl p-2 hover:bg-light_blue transition-all text-white'
                        onClick={playMusic}></i></>) :
                    (<><i className='bx bx-pause text-2xl rounded-2xl p-2 hover:bg-light_blue transition-all text-white'
                          onClick={playMusic}></i></>)}
                <div className="mx-10 overflow-hidden h-full overflow-hidden">
                    <div className="text-2xl text-white w-full h-1/2 overflow-hidden">{active?.name}</div>
                    <div className="text-2xs text-white w-full h-1/2 overflow-hidden">{active?.artist}</div>
                </div>
                <div className="w-3/6 flex flex-row justify-center items-center text-center">
                    <input type="range" className="w-4/6" min={0} max={duration} value={currentTime}
                           onChange={changeCurrentTime}/>
                    <div
                        className="text-white w-2/6">{(currentTime / 60).toFixed(1)} / {(duration / 60).toFixed(1)}</div>
                </div>
                <div className="w-3-6 flex flex-row justify-center items-center text-center">
                    <div className=" p-2 w-fit h-fit bg-transparent hover:bg-light_blue transition-all rounded-2xl">
                        {volume === 0 ? (<><i className='bx bx-volume-mute text-2xl text-white' onClick={(e) => {
                                audio.volume = 0.5
                                set_Volume(Number(50))
                            }}></i></>) :
                            (<><i className='bx bx-volume-full text-2xl text-white' onClick={(e) => {
                                audio.volume = 0
                                set_Volume(Number(0))
                            }}></i></>)}
                    </div>
                    <input type="range" className="w-4/6 mx-10" min={0} max={100} value={volume}
                           onChange={changeVolume}/>
                    <div className="text-white w-1/6">{volume}%</div>
                </div>
            </div>
        </div>
    );
};

export default Player;