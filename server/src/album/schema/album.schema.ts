
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Track} from "../../track/schema/track.schema";

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop()
    username: string;

    @Prop()
    group: string;

    @Prop()
    name: string;

    @Prop()
    listens: number;

    @Prop()
    image: string

    @Prop()
    tracks: Track[]

}

export const AlbumSchema = SchemaFactory.createForClass(Album);