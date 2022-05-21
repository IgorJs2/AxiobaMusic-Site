import {Injectable} from '@nestjs/common';
import {Track, TrackDocument} from "./schema/track.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Comment, CommentDocument} from "./schema/comment.schema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";

@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private TrackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
                private FileService: FileService) {
    }

    async create(dto: CreateTrackDto, image, audio): Promise<Track> {
        const audioPath = this.FileService.createFile(FileType.AUDIO, audio)
        const imagePath = this.FileService.createFile(FileType.IMAGE, image)

        const track = await this.TrackModel.create({...dto, listens: 0, audio: audioPath, image: imagePath})
        return track
    }

    async createAlbumTrack(dto: CreateTrackDto, audio): Promise<Track>{
        return {...dto, listens: 0, audio: audio, image: "", comments: []}
    }

    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.TrackModel.find().skip(offset).limit(count)
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.TrackModel.findById(id).populate("comments")
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.TrackModel.findByIdAndDelete(id)
        return track._id
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.TrackModel.findById(dto.trackId)
        const comment = await this.CommentModel.create({...dto})
        track.comments.push(comment._id)
        await track.save()
        return comment
    }

    async listen(id: ObjectId) {
        const track = await this.TrackModel.findById(id)
        track.listens += 1
        await track.save()
        return track.listens
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.TrackModel.find(
            {
                name: {$regex: new RegExp(query, "i")}
            }
        )
        return tracks
    }
}
