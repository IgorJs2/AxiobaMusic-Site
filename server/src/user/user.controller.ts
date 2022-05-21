import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('user')
export class UserController {

    constructor(private UserService: UserService) {
    }

    @Post()
    create(@Body() dto: CreateUserDto){
        return this.UserService.create(dto)
    }
}
