import {Module} from '@nestjs/common';
import {AlbumService} from './album.service';
import {AlbumController} from './album.controller';
import {FileService} from "../file/file.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Album, AlbumSchema} from "./schema/album.schema";
import {TrackModule} from "../track/track.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
        TrackModule
    ],
    providers: [AlbumService, FileService],
    controllers: [AlbumController],
    exports: [AlbumModule]
})
export class AlbumModule {
}
