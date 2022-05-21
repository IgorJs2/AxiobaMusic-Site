import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "../track/schema/track.schema";
import {Model} from "mongoose";
import {Album, AlbumDocument} from "../album/schema/album.schema";

@Injectable()
export class FavoriteService {
    constructor(@InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
                @InjectModel(Album.name) private AlbumModel: Model<AlbumDocument>,) {
    }

    async getFavorite(id:string[]): Promise<Object> {
        let result = {
            tracks: [],
            albums: []
        }

        for(let i = 0; i < id.length; i++){
            const Track = await this.TrackModel.findById(id[i])
            const Album = await this.AlbumModel.findById(id[i])
            if (Track) {
                result.tracks.push(Track)
            }
            if (Album) {
                result.albums.push(Album)
            }
        }
        return result

    }
}
