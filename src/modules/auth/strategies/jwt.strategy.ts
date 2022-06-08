import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Configuration } from '../../config/config.keys';
import { IJwtPayload } from '../../../interface/jwt-payload.interface';
import { UsersService } from '../../users/users.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
     constructor(private readonly _configService: ConfigService, private readonly userService: UsersService){
         super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             secretOrKey: _configService.get(Configuration.JWT_SECRET)
         });
     }

     async validate(payload: IJwtPayload){
         const { username } = payload;
         const user = await this.userService.getUser(username);

         if(!user.status){
            throw new UnauthorizedException();
         }

         return payload;
     }


}