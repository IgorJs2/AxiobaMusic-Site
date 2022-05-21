import {Body, Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import {FavoriteService} from "./favorite.service";
import {getCookies} from "cookies-next";

@Controller('/favorite')
export class FavoriteController {

    constructor(private favoriteService: FavoriteService) {
    }

    @Get(":favorite")
    async getFavorite(@Param("favorite") favorite: string){
        const idArray = JSON.parse(favorite)
        return await this.favoriteService.getFavorite(idArray)
    }


}
