import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { Configuration } from './modules/config/config.keys';
import { EmailModule } from './modules/email/email.module';
import { VideollamadaModule } from './modules/videollamada/videollamada.module';
import { DispositivosModule } from './modules/dispositivos/dispositivos.module';
import { GrupoFamiliarModule } from './modules/grupo-familiar/grupo-familiar.module';
import { VideollamadaGateway } from './gateways/videollamada.gateway';
import { AutoIncModule } from './modules/auto-inc/auto-inc.module';

@Module({
  imports: [UsersModule,
    MongooseModule.forRoot('mongodb://localhost/MySecurityTouch', 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    ),
    AuthModule,
    ConfigModule,
    EmailModule,
    VideollamadaModule,
    DispositivosModule,
    GrupoFamiliarModule,
    AutoIncModule,
  ],
  controllers: [AppController],
  providers: [AppService, VideollamadaGateway],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService){
    AppModule.port = this._configService.get(Configuration.PORT);
  }

}
