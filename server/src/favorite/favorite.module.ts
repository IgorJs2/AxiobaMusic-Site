import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "../track/schema/track.schema";
import {Album, AlbumSchema} from "../album/schema/album.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
    MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}])
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController]
})
export class FavoriteModule {}
