import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private UserService: UserService) {
    }

    async validateUser(username: string, pass: string): Promise<any>{
        const user = await this.UserService.findUser(username)
        const passwordCheck = bcrypt.compare(pass, user.password)
        if(user && passwordCheck){
            const {password, ...result} = user
            return result
        }
        return null
    }

}
