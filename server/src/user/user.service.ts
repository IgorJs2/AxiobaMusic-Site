import {Get, Injectable, Post} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./schema/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
    }

    async create(dto: CreateUserDto): Promise<User|object> {
        const password = await bcrypt.hash(dto.password, 4)
        const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (regexMail.test(dto.email)) {
            return await this.UserModel.create({login: dto.login, email: dto.email, password, favorite: {tracks: [], albums: []}})
        }
        return {error: "Invalid email"}
    }

    async findUser(username: string): Promise<User | undefined>{
        return this.UserModel.findOne({login: username})
    }

}
