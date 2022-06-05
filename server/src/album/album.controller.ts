import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ObjectId} from "mongoose";
import {AlbumService} from "./album.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/album')
export class AlbumController {
    constructor(private AlbumService: AlbumService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1},
        {name: 'audio', maxCount: 10},
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {image, audio} = files
        return this.AlbumService.create(dto, image[0], audio)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/search")
    search(@Query("query") query: string) {
        return this.AlbumService.search(query)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Query("count") count: number, @Query("offset") offset: number) {
        return this.AlbumService.getAll(count, offset)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.AlbumService.getOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.AlbumService.delete(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/listen/:id")
    listen(@Param("id") id: ObjectId) {
        return this.AlbumService.listen(id)
    }

}
