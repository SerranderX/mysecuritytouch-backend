import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from 'src/dto/signup.dto';
import { IJwtPayload } from 'src/interface/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly _jwtService: JwtService){}

    async generateToken(payload: IJwtPayload): Promise<string>{
        try{
            return this._jwtService.sign(payload);
        }catch(error){
            console.log('Ocurrio un error en service AuthService: '+error.message);
        }
    }

    async validateEmail(){ 
        try{
            const usuario = this.userService.getUser();
        }catch(error){
            console.log('Ocurrio un error en service AuthService: '+error.message);
        }
    }
    
}
