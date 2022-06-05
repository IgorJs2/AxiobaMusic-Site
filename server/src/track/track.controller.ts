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
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {ObjectId} from "mongoose";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/track')
export class TrackController {

    constructor(private trackService: TrackService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'image', maxCount: 1},
        {name: 'audio', maxCount: 1},
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const {image, audio} = files
        return this.trackService.create(dto, image[0], audio[0])
    }

    @UseGuards(JwtAuthGuard)
    @Get("/search")
    search(@Query("query") query: string) {
        return this.trackService.search(query)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Query("count") count: number, @Query("offset") offset: number) {
        return this.trackService.getAll(count, offset)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.trackService.getOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.trackService.delete(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/comment")
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/listen/:id")
    listen(@Param("id") id: ObjectId) {
        return this.trackService.listen(id)
    }

}
