import {Module} from "@nestjs/common";
import {TrackModule} from './track/track.module';
import {AlbumModule} from './album/album.module';
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from './file/file.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { FavoriteModule } from './favorite/favorite.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as path from "path"
import {AppController} from "./app.controller";

require('dotenv').config()


@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.join(__dirname, "static")}),
        MongooseModule.forRoot(process.env.MongoURI),
        TrackModule, AlbumModule, FileModule, FavoriteModule, UserModule, AuthModule
    ],
    providers: [],
    controllers: [AppController],
})
export class AppModule {

}