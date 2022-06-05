import {Get, Injectable, Post} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {User, UserDocument} from "./schema/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
    }

    async create(dto: CreateUserDto): Promise<User | object> {
        const password = await bcrypt.hash(dto.password, 4)
        const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let errors = []
        let fields = []

        const Users = await this.UserModel.find({$or: [{email: dto.email}, {login: dto.login}]})

        if (Users[0]) {
            errors.push("USER:This user already registered")
            fields.push("User")
        }
        if (dto.login.length < 5) {
            errors.push("LOGIN:Login must have more than 5 symbols")
            fields.push("Login")
        }
        if (dto.password.length < 5) {
            errors.push("PASSWORD:Password must have more than 5 symbols")
            fields.push("Password")
        }
        if (!regexMail.test(dto.email)) {
            errors.push("EMAIL:Invalid email")
            fields.push("Email")
        }

        if (errors[0]) {
            return {errors, fields}
        }

        const user = await this.UserModel.create({
            login: dto.login,
            email: dto.email,
            password,
            favorite: {tracks: [], albums: []}
        })
        return user
    }

    async findUser(username: string): Promise<{ _id: ObjectId, login: string, password: string } | undefined> {
        const user = await this.UserModel.findOne({login: username})
        return {_id: user._id, login: user.login, password: user.password}
    }


}
