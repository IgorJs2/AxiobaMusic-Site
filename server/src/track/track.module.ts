import {Module} from '@nestjs/common';
import {TrackService} from './track.service';
import {TrackController} from './track.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "./schema/track.schema";
import {Comment, CommentSchema} from "./schema/comment.schema";
import {FileService} from "../file/file.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),

    ],
    providers: [TrackService, FileService],
    controllers: [TrackController],
    exports: [TrackModule, TrackService]
})
export class TrackModule {
}
