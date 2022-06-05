import React, {FC} from 'react';
import {ITrack} from "../../types/track";
import TrackItem from "./TrackItem/TrackItem";

type TrackListProps = {
    tracks: ITrack[],
    flag?: string
}

const TrackList: FC<TrackListProps> = ({tracks, flag}) => {
    return (
        <tbody>
        {tracks.map((elem, i) => {
            return (
                <TrackItem elem={elem} i={i} key={elem._id} flag={flag}/>
            )
        })}
        </tbody>
    );
};

export default TrackList;