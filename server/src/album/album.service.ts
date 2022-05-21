import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Album, AlbumDocument} from "./schema/album.schema";
import {Model, ObjectId} from "mongoose";
import {FileService, FileType} from "../file/file.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {TrackService} from "../track/track.service";

@Injectable()
export class AlbumService {
    constructor(@InjectModel(Album.name) private AlbumModel: Model<AlbumDocument>,
                private FileService: FileService, private TrackService: TrackService) {
    }

    // @ts-ignore
    async create(dto: CreateAlbumDto, image, audio): Promise<Album> {

        const imagePath = this.FileService.createFile(FileType.IMAGE, image)
        const audioPaths = audio.map((elem) => this.FileService.createFile(FileType.AUDIO, elem))
        let tracks = []

        for(let i = 0; i < dto.artists.split(" ").length - 1; i++){
            const artist = dto.artists.split(" ")[i + 1].split("@!").join(" ")
            const name =  dto.names.split(" ")[i + 1].split("@!").join(" ")
            const track = await this.TrackService.createAlbumTrack({artist, name, text: ""}, audioPaths[i])
            tracks.push(track)
        }

        const album = await this.AlbumModel.create({name: dto.name, username: dto.username, group: dto.group, listens: 0, image: imagePath, tracks: tracks})
        return album
    }

    async getAll(count = 10, offset = 0): Promise<Album[]> {
        const albums = await this.AlbumModel.find().skip(offset).limit(count)
        return albums
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await this.AlbumModel.findById(id)
        return album
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const album = await this.AlbumModel.findByIdAndDelete(id)
        return album._id
    }

    async listen(id: ObjectId) {
        const album = await this.AlbumModel.findById(id)
        album.listens += 1
        await album.save()
        return album.listens
    }

    async search(query: string): Promise<Album[]> {
        const albums = await this.AlbumModel.find(
            {
                name: {$regex: new RegExp(query, "i")}
            }
        )
        return albums
    }
}
