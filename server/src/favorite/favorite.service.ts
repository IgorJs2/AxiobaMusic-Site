import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "../track/schema/track.schema";
import {Model} from "mongoose";
import {Album, AlbumDocument} from "../album/schema/album.schema";
import {User, UserDocument} from "../user/schema/user.schema";

@Injectable()
export class FavoriteService {
    constructor(@InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
                @InjectModel(Album.name) private AlbumModel: Model<AlbumDocument>,
                @InjectModel(User.name) private UserModel: Model<UserDocument>) {
    }

    async setFavorite(id: string, values: string[]): Promise<Object> {
        let User = await this.UserModel.findById(id)

        let newFavorite = {
            tracks: [],
            albums: [],
        }

        for (let i = 0; i < values.length; i++) {
            const Track = await this.TrackModel.findById(values[i])
            const Album = await this.AlbumModel.findById(values[i])
            if (Track) {
                newFavorite.tracks.push(Track._id)
            }
            if (Album) {
                newFavorite.albums.push(Album._id)
            }
        }

        await this.UserModel.findOneAndUpdate({_id: id}, {favorite: newFavorite})

        console.log(newFavorite)

        const result = {tracks: [], albums: []}

        for (let i = 0; i < newFavorite.tracks.length; i++) {
            const Track = await this.TrackModel.findById(newFavorite.tracks[i])
            if (Track) {
                result.tracks.push(Track)
            }
        }

        for (let i = 0; i < newFavorite.albums.length; i++) {
            const Album = await this.AlbumModel.findById(newFavorite.albums[i])
            if (Album) {
                result.albums.push(Album)
            }
        }

        return result
    }

    async getFavorite(id: string): Promise<Object> {
        const User = await this.UserModel.findById(id)
        const result = {tracks: [], albums: []}

        for (let i = 0; i < User.favorite.tracks.length; i++) {
            const Track = await this.TrackModel.findById(User.favorite.tracks[i])
            if (Track) {
                result.tracks.push(Track)
            }
        }

        for (let i = 0; i < User.favorite.albums.length; i++) {
            const Album = await this.AlbumModel.findById(User.favorite.albums[i])
            if (Album) {
                result.albums.push(Album)
            }
        }

        return result
    }
}
