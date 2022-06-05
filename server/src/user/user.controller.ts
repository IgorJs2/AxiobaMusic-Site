import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('user')
export class UserController {

    constructor(private UserService: UserService) {
    }

    @Post()
    create(@Body() dto: CreateUserDto){
        return this.UserService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
