import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { Configuration } from '../config/config.keys';
import { EmailModule } from '../email/email.module';
import { DispositivosModule } from '../dispositivos/dispositivos.module';
import { GrupoFamiliarModule } from '../grupo-familiar/grupo-familiar.module';


@Module({
  providers: [AuthService, ConfigService, JwtStrategy],
  controllers: [AuthController],
  imports:[forwardRef(() => UsersModule),
           forwardRef(() => DispositivosModule),
           forwardRef(() => EmailModule),
           forwardRef(() => GrupoFamiliarModule),
           forwardRef(() => DispositivosModule),
           PassportModule.register({defaultStrategy: 'jwt'}),
                        JwtModule.registerAsync({
                          imports: [ConfigModule],
                          inject: [ConfigService],
                          useFactory(config: ConfigService){
                            return {
                              secret: config.get(Configuration.JWT_SECRET),
                              signOptions: {
                                expiresIn: 18000,
                              }
                            }
                          }
                        })],
  exports:[PassportModule, JwtStrategy]
})
export class AuthModule {}
