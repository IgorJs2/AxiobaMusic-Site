import {Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UseGuards} from '@nestjs/common';
import {FavoriteService} from "./favorite.service";
import addFavoriteDto from "./dto/addFavoriteDto"
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/favorite')
export class FavoriteController {

    constructor(private favoriteService: FavoriteService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getFavorite(@Param("id") id: string) {
        return await this.favoriteService.getFavorite(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async setFavorite(@Body() dto: addFavoriteDto) {
        const arrayId = JSON.parse(dto.arrayId)
        return await this.favoriteService.setFavorite(dto.userId, arrayId)
    }

}
