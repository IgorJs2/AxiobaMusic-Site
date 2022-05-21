import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ObjectId} from "mongoose";
import {AlbumService} from "./album.service";
import {CreateAlbumDto} from "./dto/create-album.dto";

@Controller('/album')
export class AlbumController {
    constructor(private AlbumService: AlbumService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1},
        {name: 'audio', maxCount: 10},
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {image, audio} = files
        return this.AlbumService.create(dto, image[0], audio)
    }

    @Get("/search")
    search(@Query("query") query: string) {
        return this.AlbumService.search(query)
    }

    @Get()
    getAll(@Query("count") count: number, @Query("offset") offset: number) {
        return this.AlbumService.getAll(count, offset)
    }

    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.AlbumService.getOne(id)
    }

    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.AlbumService.delete(id)
    }

    @Get("/listen/:id")
    listen(@Param("id") id: ObjectId) {
        return this.AlbumService.listen(id)
    }

}
