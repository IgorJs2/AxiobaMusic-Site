import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private UserService: UserService, private jwtService: JwtService) {
    }

    async validateUser(username: string, pass: string): Promise<any>{
        const user = await this.UserService.findUser(username)
        const passwordCheck = await bcrypt.compare(pass, user.password)
        if(user && passwordCheck){
            return {userId: user._id, username: user.login}
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
